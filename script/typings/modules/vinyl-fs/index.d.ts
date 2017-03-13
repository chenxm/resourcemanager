// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-vinyl/13670eff75aba7b4c95546ec9eebbb72e3537188/index.d.ts
declare module '~vinyl-fs~vinyl' {

import * as fs from 'fs';

namespace File {
    export interface FileOptions {

        /**
         * Default: process.cwd()
         */
        cwd?: string;

        /**
         * Used for relative pathing. Typically where a glob starts.
         */
        base?: string;

        /**
         * Full path to the file.
         */
        path?: string;

        /**
         * Path history. Has no effect if options.path is passed.
         */
        history?: string[];

        /**
         * The result of an fs.stat call. See fs.Stats for more information.
         */
        stat?: fs.Stats;

        /**
         * File contents.
         * Type: Buffer, Stream, or null
         */
        contents?: Buffer | NodeJS.ReadWriteStream;
    }

    export interface PipeOptions {
        /**
         * If false, the destination stream will not be ended (same as node core).
         */
        end?: boolean;
    }
}

/**
 * A virtual file format.
 */
class File {
    constructor(options?: File.FileOptions);

    /**
     * Default: process.cwd()
     */
    public cwd: string;

    /**
     * Used for relative pathing. Typically where a glob starts.
     */
    public dirname: string;
    public basename: string;
    public base: string;

    /**
     * Full path to the file.
     */
    public path: string;
    public stat: fs.Stats;

    /**
     * Gets and sets stem (filename without suffix) for the file path.
     */
    public stem: string;

    /**
     * Gets and sets path.extname for the file path
     */
    public extname: string;

    /**
     * Array of path values the file object has had
     */
    public history: string[];

    /**
     * Type: Buffer|Stream|null (Default: null)
     */
    public contents: Buffer | NodeJS.ReadableStream;

    /**
     * Returns path.relative for the file base and file path.
     * Example:
     *  var file = new File({
     *    cwd: "/",
     *    base: "/test/",
     *    path: "/test/file.js"
     *  });
     *  console.log(file.relative); // file.js
     */
    public relative: string;

    /**
     * Returns true if file.contents is a Buffer.
     */
    public isBuffer(): boolean;

    /**
     * Returns true if file.contents is a Stream.
     */
    public isStream(): boolean;

    /**
     * Returns true if file.contents is null.
     */
    public isNull(): boolean;

    /**
     * Returns a new File object with all attributes cloned. Custom attributes are deep-cloned.
     */
    public clone(opts?: { contents?: boolean, deep?: boolean }): File;

    /**
     * If file.contents is a Buffer, it will write it to the stream.
     * If file.contents is a Stream, it will pipe it to the stream.
     * If file.contents is null, it will do nothing.
     */
    public pipe<T extends NodeJS.ReadWriteStream>(stream: T, opts?: File.PipeOptions): T;

    /**
     * Returns a pretty String interpretation of the File. Useful for console.log.
     */
    public inspect(): string;

    /**
     * Checks if a given object is a vinyl file.
     */
    public static isVinyl(obj: any): boolean;
}

export = File;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/typed-typings/npm-minimatch/74f47de8acb42d668491987fc6bc144e7d9aa891/minimatch.d.ts
declare module '~vinyl-fs~glob-stream~glob~minimatch' {
function minimatch (target: string, pattern: string, options?: minimatch.Options): boolean;

namespace minimatch {
	export function match (list: string[], pattern: string, options?: Options): string[];
	export function filter (pattern: string, options?: Options): (element: string, indexed: number, array: string[]) => boolean;
	export function makeRe (pattern: string, options?: Options): RegExp;

  /**
   * All options are `false` by default.
   */
	export interface Options {
    /**
     * Dump a ton of stuff to stderr.
     */
		debug?: boolean;
    /**
     * Do not expand `{a,b}` and `{1..3}` brace sets.
     */
		nobrace?: boolean;
    /**
     * Disable `**` matching against multiple folder names.
     */
		noglobstar?: boolean;
    /**
     * Allow patterns to match filenames starting with a period, even if the pattern does not explicitly have a period in that spot.
     *
     * Note that by default, `a\/**\/b` will not match `a/.d/b`, unless `dot` is set.
     */
		dot?: boolean;
    /**
     * Disable "extglob" style patterns like `+(a|b)`.
     */
		noext?: boolean;
    /**
     * Perform a case-insensitive match.
     */
		nocase?: boolean;
    /**
     * When a match is not found by `minimatch.match`, return a list containing the pattern itself if this option is set. When not set, an empty list is returned if there are no matches.
     */
		nonull?: boolean;
    /**
     * If set, then patterns without slashes will be matched against the basename of the path if it contains slashes. For example, `a?b` would match the path `/xyz/123/acb`, but not `/xyz/acb/123`.
     */
		matchBase?: boolean;
    /**
     * Suppress the behavior of treating `#` at the start of a pattern as a comment.
     */
		nocomment?: boolean;
    /**
     * Suppress the behavior of treating a leading `!` character as negation.
     */
		nonegate?: boolean;
    /**
     * Returns from negate expressions the same as if they were not negated. (Ie, true on a hit, false on a miss.)
     */
		flipNegate?: boolean;
	}

	export class Minimatch {
		constructor (pattern: string, options?: Options);

    /**
     * The original pattern the minimatch object represents.
     */
    pattern: string;
    /**
     * The options supplied to the constructor.
     */
		options: Options;

    /**
     * Created by the `makeRe` method. A single regular expression expressing the entire pattern. This is useful in cases where you wish to use the pattern somewhat like `fnmatch(3)` with `FNM_PATH` enabled.
     */
		regexp: RegExp;
    /**
     * True if the pattern is negated.
     */
		negate: boolean;
    /**
     * True if the pattern is a comment.
     */
		comment: boolean;
    /**
     * True if the pattern is `""`.
     */
		empty: boolean;

    /**
     * Generate the regexp member if necessary, and return it. Will return false if the pattern is invalid.
     */
		makeRe (): RegExp | boolean;
    /**
     * Return true if the filename matches the pattern, or false otherwise.
     */
		match (fname: string): boolean;
    /**
     * Take a `/-`split filename, and match it against a single row in the `regExpSet`. This method is mainly for internal use, but is exposed so that it can be used by a glob-walker that needs to avoid excessive filesystem calls.
     */
		matchOne (fileArray: string[], patternArray: string[], partial: boolean): boolean;
	}
}

export = minimatch;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-glob/59ca0f5d4696a8d4da27858035316c1014133fcb/glob.d.ts
declare module '~vinyl-fs~glob-stream~glob' {
import events = require('events');
import fs = require('fs');
import minimatch = require('~vinyl-fs~glob-stream~glob~minimatch');

function glob (pattern: string, cb: (err: Error, matches: string[]) => void): void;
function glob (pattern: string, options: glob.Options, cb: (err: Error, matches: string[]) => void): void;

namespace glob {
  export function sync (pattern: string, options?: Options): string[];
  export function hasMagic (pattern: string, options?: Options): boolean;

  export interface Cache {
    [path: string]: boolean | string | string[];
  }

  export interface StatCache {
    [path: string]: fs.Stats;
  }

  export interface Symlinks {
    [path: string]: boolean;
  }

  export interface Options extends minimatch.Options {
    /**
     * The current working directory in which to search. Defaults to `process.cwd()`.
     */
    cwd?: string;
    /**
     * The place where patterns starting with `/` will be mounted onto. Defaults to `path.resolve(options.cwd, "/")` (`/` on Unix systems, and `C:\` or some such on Windows.)
     */
    root?: string;
    /**
     * Include `.dot` files in normal matches and `globstar` matches. Note that an explicit dot in a portion of the pattern will always match dot files.
     */
    dot?: boolean;
    /**
     * By default, a pattern starting with a forward-slash will be "mounted" onto the root setting, so that a valid filesystem path is returned. Set this flag to disable that behavior.
     */
    nomount?: boolean;
    /**
     * Add a `/` character to directory matches. Note that this requires additional stat calls.
     */
    mark?: boolean;
    /**
     * Don't sort the results.
     */
    nosort?: boolean;
    /**
     * Set to true to stat all results. This reduces performance somewhat, and is completely unnecessary, unless `readdir` is presumed to be an untrustworthy indicator of file existence.
     */
    stat?: boolean;
    /**
     * When an unusual error is encountered when attempting to read a directory, a warning will be printed to stderr. Set the `silent` option to true to suppress these warnings.
     */
    silent?: boolean;
    /**
     * When an unusual error is encountered when attempting to read a directory, the process will just continue on in search of other matches. Set the `strict` option to raise an error in these cases.
     */
    strict?: boolean;
    /**
     * See `cache` property above. Pass in a previously generated cache object to save some fs calls.
     */
    cache?: Cache;
    /**
     * A cache of results of filesystem information, to prevent unnecessary stat calls. While it should not normally be necessary to set this, you may pass the statCache from one glob() call to the options object of another, if you know that the filesystem will not change between calls. (See https://github.com/isaacs/node-glob#race-conditions)
     */
    statCache?: StatCache;
    /**
     * A cache of known symbolic links. You may pass in a previously generated `symlinks` object to save lstat calls when resolving `**` matches.
     */
    symlinks?: Symlinks;
    /**
     * DEPRECATED: use `glob.sync(pattern, opts)` instead.
     */
    sync?: boolean;
    /**
     * In some cases, brace-expanded patterns can result in the same file showing up multiple times in the result set. By default, this implementation prevents duplicates in the result set. Set this flag to disable that behavior.
     */
    nounique?: boolean;
    /**
     * Set to never return an empty set, instead returning a set containing the pattern itself. This is the default in glob(3).
     */
    nonull?: boolean;
    /**
     * Set to enable debug logging in minimatch and glob.
     */
    debug?: boolean;
    /**
     * Do not expand `{a,b}` and `{1..3}` brace sets.
     */
    nobrace?: boolean;
    /**
     * Do not match `**` against multiple filenames. (Ie, treat it as a normal `*` instead.)
     */
    noglobstar?: boolean;
    /**
     * Do not match `+(a|b)` "extglob" patterns.
     */
    noext?: boolean;
    /**
     * Perform a case-insensitive match. Note: on case-insensitive filesystems, non-magic patterns will match by default, since `stat` and `readdir` will not raise errors.
     */
    nocase?: boolean;
    /**
     * Perform a basename-only match if the pattern does not contain any slash characters. That is, `*.js` would be treated as equivalent to `**\/*.js`, matching all js files in all directories.
     */
    matchBase?: any;
    /**
     * Do not match directories, only files. (Note: to match only directories, simply put a `/` at the end of the pattern.)
     */
    nodir?: boolean;
    /**
     * Add a pattern or an array of glob patterns to exclude matches. Note: `ignore` patterns are always in `dot:true` mode, regardless of any other settings.
     */
    ignore?: string | string[];
    /**
     * Follow symlinked directories when expanding `**` patterns. Note that this can result in a lot of duplicate references in the presence of cyclic links.
     */
    follow?: boolean;
    /**
     * Set to true to call `fs.realpath` on all of the results. In the case of a symlink that cannot be resolved, the full absolute path to the matched entry is returned (though it will usually be a broken symlink)
     */
    realpath?: boolean;
  }

  export class Glob extends events.EventEmitter {
    constructor (pattern: string, cb?: (err: Error, matches: string[]) => void);
    constructor (pattern: string, options: Options, cb?: (err: Error, matches: string[]) => void);

    /**
     * The minimatch object that the glob uses.
     */
    minimatch: minimatch.Minimatch;
    /**
     * The options object passed in.
     */
    options: Options;
    /**
     * Boolean which is set to true when calling `abort()`. There is no way at this time to continue a glob search after aborting, but you can re-use the statCache to avoid having to duplicate syscalls.
     * @type {boolean}
     */
    aborted: boolean;
    /**
     * Convenience object.
     */
    cache: Cache;
    /**
     * Cache of `fs.stat` results, to prevent statting the same path multiple times.
     */
    statCache: StatCache;
    /**
     * A record of which paths are symbolic links, which is relevant in resolving `**` patterns.
     */
    symlinks: Symlinks;
    /**
     * An optional object which is passed to `fs.realpath` to minimize unnecessary syscalls. It is stored on the instantiated Glob object, and may be re-used.
     */
    realpathCache: { [path: string]: string };
    found: string[];

    /**
     * Temporarily stop the search.
     */
    pause(): void;
    /**
     * Resume the search.
     */
    resume(): void;
    /**
     * Stop the search forever.
     */
    abort(): void;
  }
}

export = glob;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-glob-stream/678827da5642c639d3e0c572d96211d278b1e87e/index.d.ts
declare module '~vinyl-fs~glob-stream' {

import glob = require('~vinyl-fs~glob-stream~glob');

export interface Options extends glob.Options {
    cwd?: string;
    base?: string;
    cwdbase?: boolean;
}

export interface Element {
    cwd: string;
    base: string;
    path: string;
}

export function create(glob: string, opts?: Options): NodeJS.ReadableStream;
export function create(globs: string[], opts?: Options): NodeJS.ReadableStream;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-through2/83d47b72bdd67d6b94155846514a0e4212458d53/index.d.ts
declare module '~vinyl-fs~through2' {
// Type definitions for through2 v 2.0.0
// Project: https://github.com/rvagg/through2
// Original Definitions by: Bart van der Schoor <https://github.com/Bartvds>, jedmao <https://github.com/jedmao>, Georgios Valotasios <https://github.com/valotas>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

import * as stream from 'stream';

function through2(transformFunction?: through2.TransformFunction, flushFunction?: through2.FlushCallback): NodeJS.ReadWriteStream;
function through2(options?: through2.Options, transformFunction?: through2.TransformFunction, flushFunction?: through2.FlushCallback): NodeJS.ReadWriteStream;

namespace through2 {

  export type TransformCallback = (err?: any, data?: any) => void;
  export type TransformFunction = (chunk: any, encoding: string, callback: TransformCallback) => void;
  export type FlushCallback = (flushCallback: () => void) => void;

  export interface Options extends stream.DuplexOptions {}

  export function ctor(options?: Options, transformFunction?: TransformFunction, flushFunction?: FlushCallback): NodeJS.ReadWriteStream;
  export function obj(transformFunction?: TransformFunction, flushFunction?: FlushCallback): NodeJS.ReadWriteStream;

  /**
   * Type of `this` inside TransformFunction and FlushCallback.
   */
  export interface This {
    push(data: any): void;
  }
}

export = through2;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/types/npm-vinyl-fs/94022d746133d86138b21e97fdc4179a89645685/index.d.ts
declare module 'vinyl-fs' {

import File = require('~vinyl-fs~vinyl');
import * as globStream from '~vinyl-fs~glob-stream';
import * as through from '~vinyl-fs~through2';

interface SrcOptions extends globStream.Options, through.Options {

    /** Specifies the working directory the folder is relative to */
    cwd?: string;

    /**
     * Specifies the folder relative to the cwd
     * This is used to determine the file names when saving in .dest()
     * Default is where the glob begins
     */
    base?: string;

    /**
     * Setting this to false will make file.contents a paused stream
     * If true it will buffer the file contents
     * Defaults to true
     */
    buffer?: boolean;

    /**
     * Setting this to false will ignore the contents of the file and disable writing to disk to speed up operations
     * Defaults to true
     */
    read?: boolean;

    /**  Only find files that have been modified since the time specified */
    since?: Date | number;

    /**
     * Setting this to true will create a duplex stream, one that passes through items and emits globbed files.
     * Defaults to false
     */
    passthrough?: boolean;

    /**
     * Setting this to true will enable sourcemaps.
     * Defaults to false
     */
    sourcemaps?: boolean;
}

/**
 * Gets files that match the glob and converts them into the vinyl format
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * Globs are executed in order, so negations should follow positive globs
 * fs.src(['!b*.js', '*.js']) would not exclude any files, but this would: fs.src(['*.js', '!b*.js'])
 * @param opt Options Vinyl source options, changes the way the files are read, found, or stored in the vinyl stream
 */
export function src(globs: string | string[], options?: SrcOptions): NodeJS.ReadWriteStream;

export interface DestOptions {
    /**
     * Specify the working directory the folder is relative to
     * Default is process.cwd()
     */
    cwd?: string;

    /**
     * Specify the mode the files should be created with
     * Default is the mode of the input file (file.stat.mode)
     * or the process mode if the input file has no mode property
     */
    mode?: number | string;

    /** Specify the mode the directory should be created with. Default is the process mode */
    dirMode?: number | string;

    /** Specify if existing files with the same path should be overwritten or not. Default is true, to always overwrite existing files */
    overwrite?: boolean;
}

/**
 * On write the stream will save the vinyl File to disk at the folder/cwd specified.
 * After writing the file to disk, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 * stat.mode will be overwritten if you used a mode parameter
 * contents will have it's position reset to the beginning if it is a stream
 * @param folder destination folder
 */
export function dest(folder: string, options?: DestOptions): NodeJS.ReadWriteStream;

/**
 * On write the stream will save the vinyl File to disk at the folder/cwd specified.
 * After writing the file to disk, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 * stat.mode will be overwritten if you used a mode parameter
 * contents will have it's position reset to the beginning if it is a stream
 * @param getFolderPath function that takes in a file and returns a folder path
 */
export function dest(getFolderPath: (file: File) => string): NodeJS.ReadWriteStream;

export interface SymlinkOptions {

    /**
     * Specify the working directory the folder is relative to
     * Default is process.cwd()
     */
    cwd?: string;

    /** Specify the mode the directory should be created with. Default is the process mode */
    mode?: number | string;

    /**
     * Specify the mode the directory should be created with
     * Default is the process mode
     */
    dirMode?: number;
}

/**
 * On write the stream will create a symbolic link (i.e. symlink) on disk at the folder/cwd specified.
 * After creating the symbolic link, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 */
export function symlink(folder: string, opts?: SymlinkOptions): NodeJS.ReadWriteStream;

/**
 * On write the stream will create a symbolic link (i.e. symlink) on disk at the folder/cwd generated from getFolderPath.
 * After creating the symbolic link, it will be emitted from the stream so you can keep piping these around.
 * The file will be modified after being written to this stream:
 * cwd, base, and path will be overwritten to match the folder
 */
export function symlink(getFolderPath: (File: File) => string, opts?: SymlinkOptions): NodeJS.ReadWriteStream;
}