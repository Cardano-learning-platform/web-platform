import * as monaco from 'monaco-editor';

// Import workers
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// Configure worker environment
self.MonacoEnvironment = {
    getWorker: function (_: string, label: string) {
        switch (label) {
            case 'json':
                return new jsonWorker();
            case 'css':
            case 'scss':
            case 'less':
                return new cssWorker();
            case 'html':
            case 'handlebars':
            case 'razor':
                return new htmlWorker();
            case 'typescript':
            case 'javascript':
                return new tsWorker();
            default:
                return new editorWorker();
        }
    }
};

// Register Haskell language
monaco.languages.register({ id: 'haskell' });

// Configure Haskell syntax highlighting
monaco.languages.setMonarchTokensProvider('haskell', {
    keywords: [
        'module', 'where', 'import', 'data', 'type', 'class', 'instance',
        'let', 'in', 'do', 'case', 'of', 'if', 'then', 'else'
    ],

    tokenizer: {
        root: [
            [/--.*$/, 'comment'],
            [/{-/, 'comment', '@comment'],
            [/\b(LANGUAGE|INLINABLE|NOINLINE)\b/, 'annotation'],
            [/\b(module|where|import|data|type|class|instance|let|in|do|case|of|if|then|else)\b/, 'keyword'],
            [/[a-z][a-zA-Z0-9_']*/, 'identifier'],
            [/[A-Z][a-zA-Z0-9_']*/, 'type.identifier'],
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, { token: 'string.quote', next: '@string' }],
        ],

        comment: [
            [/[^{-]/, 'comment'],
            [/-}/, 'comment', '@pop'],
            [/{-/, 'comment', '@push']
        ],

        string: [
            [/[^\\"]+/, 'string'],
            [/"/, { token: 'string.quote', next: '@pop' }]
        ]
    }
});

export default monaco;