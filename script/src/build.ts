import { Data, ResourceConfig } from './';
import * as c from './config';
import * as utils from 'egret-node-utils';
import * as fs from 'fs-extra-promise';
import * as path from 'path';

namespace original {


    export interface Info {
        groups: GroupInfo[],
        resources: ResourceInfo[],
    }

    interface GroupInfo {
        keys: string,
        name: string
    }

    interface ResourceInfo {
        name: string;
        type: string;
        url: string;
        subkeys: string;
    }
}

let projectRoot;


export async function build(p: string, format: "json" | "text") {


    let result = await ResourceConfig.init(p);
    ResourceConfig.typeSelector = result.typeSelector;
    if (!ResourceConfig.typeSelector) {
        throw "missing typeSelector in Main.ts";
    }


    let executeFilter = async (f) => {

        let config = ResourceConfig.config;
        var ext = f.substr(f.lastIndexOf(".") + 1);
        let type = ResourceConfig.typeSelector(f);
        if (type) {
            return { name: f, url: f, type };
        }

    }

    projectRoot = p;
    let resourcePath = path.join(projectRoot, result.resourceRoot);
    let filename = path.join(resourcePath, result.resourceConfigFileName);

    let option: utils.walk.WalkOptions = {
        relative: true,
        ignoreHiddenFile: true
    }

    let list = await utils.walk(resourcePath, () => true, option);
    let files = await Promise.all(list.map(executeFilter));
    files.filter(a => a).forEach(element => ResourceConfig.addFile(element));

    await convertResourceJson(projectRoot);
    await updateResourceConfigFileContent(filename);
}

export async function updateResourceConfigFileContent(filename: string) {
    let content = JSON.stringify(ResourceConfig.config, null, "\t");
    await fs.writeFileAsync(filename, content, "utf-8");
    return content;
    // var c = ResourceConfig.config;
    // let content = await updateResourceConfigFileContent_2(filename, "exports.resources", c.resources);
    // content = await updateResourceConfigFileContent_2(filename, "exports.groups", c.groups);
    // content = await updateResourceConfigFileContent_2(filename, "exports.alias", c.alias);
    // return content;
}

async function updateResourceConfigFileContent_2(filename, matcher, data) {
    let content = await c.publish(filename, matcher, data);
    await fs.writeFileAsync(filename, content, "utf-8");
    return content;
}



export async function convertResourceJson(projectRoot: string) {

    let filename = path.join(projectRoot, "resource/default.res.json");
    if (!fs.existsSync(filename)) {
        filename = path.join(projectRoot, "resource/resource.json");
    }
    if (!fs.existsSync(filename)) {
        return;
    }
    let config = ResourceConfig.config;
    let resourceJson: original.Info = await fs.readJSONAsync(filename);
    // let resourceJson: original.Info = await fs.readJSONAsync(resourceJsonPath);
    for (let r of resourceJson.resources) {
        config.alias[r.name] = r.url;

        let file = ResourceConfig.getFile(r.url);
        for (var resource_custom_key in r) {
            if (resource_custom_key == "url" || resource_custom_key == "type" || resource_custom_key == "name") {
                continue;
            }
            else if (resource_custom_key == "subkeys") {
                var subkeysArr = r.subkeys.split(",");
                for (let subkey of subkeysArr) {
                    // if (!obj.alias[subkeysArr[i]]) {
                    config.alias[subkey] = r.url + "#" + subkey;
                    // }
                }
            }
            else {
                if (typeof file != "string") {
                    file[resource_custom_key] = r[resource_custom_key];
                }
                else {
                    console.warn(`missing properties ${resource_custom_key} in ${file}`)
                }
            }

        }
    }
    for (let group of resourceJson.groups) {
        config.groups[group.name] = group.keys.split(",");
    }

    return ResourceConfig.config;
}