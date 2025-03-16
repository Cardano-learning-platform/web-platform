export interface ValidationError {
    type: string;
    message: string;
    details?: string;
    suggestion?: string;
    lines?: { lineNumber: number; content: string }[];
}

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

/**
 * Validates Plutus code for common issues
 */
export function validatePlutusCode(code: string): ValidationResult {
    const results: ValidationResult = {
        isValid: true,
        errors: []
    };


    const placeholderRegex = /--\s*write your code here\s*$/gm;
    const yourCodeHereRegex = /--\s*your code here\s*$/gm;
    const placeholders = [...code.matchAll(placeholderRegex)];
    const yourCodePlaceholders = [...code.matchAll(yourCodeHereRegex)];

    if (placeholders.length > 0 || yourCodePlaceholders.length > 0) {
        results.isValid = false;
        results.errors.push({
            type: "MISSING_IMPLEMENTATION",
            message: "Code contains placeholder comments that need to be implemented",
            lines: [
                ...placeholders.map(match => {
                    const lineNumber = code.substring(0, match.index!).split('\n').length;
                    return {
                        lineNumber,
                        content: match[0]
                    };
                }),
                ...yourCodePlaceholders.map(match => {
                    const lineNumber = code.substring(0, match.index!).split('\n').length;
                    return {
                        lineNumber,
                        content: match[0]
                    };
                })
            ]
        });
    }


    const hasUTxORegex = /hasUTxO\s*::\s*Bool\s*\n\s*hasUTxO\s*=\s*(?:--\s*write your code here|--\s*your code here|$)/m;
    if (hasUTxORegex.test(code)) {
        results.isValid = false;
        results.errors.push({
            type: "MISSING_IMPLEMENTATION",
            message: "The hasUTxO function is not implemented",
            suggestion: "any (\\i -> txInInfoOutRef i == oref) $ txInfoInputs info"
        });
    }

    const checkMintedAmountRegex = /checkMintedAmount\s*::\s*Bool\s*\n\s*checkMintedAmount\s*=\s*(?:--\s*write your code here|--\s*your code here|$)/m;
    if (checkMintedAmountRegex.test(code)) {
        results.isValid = false;
        results.errors.push({
            type: "MISSING_IMPLEMENTATION",
            message: "The checkMintedAmount function is not implemented",
            suggestion: "case flattenValue (txInfoMint info) of\n        [(_, tn'', amt)] -> tn'' == tn && amt == 1\n        _                -> False"
        });
    }


    const lines = code.split('\n');
    const indentLevels: Record<number, number[]> = {};


    lines.forEach((line, index) => {

        if (line.trim() === '' || line.trim().startsWith("--") || !line.startsWith(' ')) {
            return;
        }


        const leadingSpaces = line.length - line.trimStart().length;


        if (leadingSpaces > 0) {

            if (!indentLevels[leadingSpaces]) {
                indentLevels[leadingSpaces] = [];
            }
            indentLevels[leadingSpaces].push(index + 1);
        }
    });


    const indentSizes = Object.keys(indentLevels).map(Number);
    const uniqueIndentDiffs = new Set<number>();

    for (let i = 0; i < indentSizes.length; i++) {
        for (let j = i + 1; j < indentSizes.length; j++) {
            const diff = Math.abs(indentSizes[i] - indentSizes[j]);
            if (diff > 0 && diff !== 2 && diff !== 4) {
                uniqueIndentDiffs.add(diff);
            }
        }
    }

    if (uniqueIndentDiffs.size > 0) {
        results.isValid = false;
        results.errors.push({
            type: "INCONSISTENT_INDENTATION",
            message: "Inconsistent indentation detected",
            details: `Found mixed indentation levels: ${Array.from(uniqueIndentDiffs).join(', ')} spaces`
        });
    }


    const requiredImports = [
        "Plutus.V1.Ledger.Value",
        "Plutus.V2.Ledger.Api",
        "PlutusTx",
        "PlutusTx.Prelude"
    ];

    const missingImports = requiredImports.filter(importName => !code.includes(importName));
    if (missingImports.length > 0) {
        results.isValid = false;
        results.errors.push({
            type: "MISSING_IMPORT",
            message: `Missing required import${missingImports.length > 1 ? 's' : ''}`,
            details: missingImports.join(', ')
        });
    }


    const requiredFunctions = [
        { name: "mkNFTPolicy", signature: "mkNFTPolicy :: TxOutRef -> TokenName -> () -> ScriptContext -> Bool" },
        { name: "mkWrappedNFTPolicy", signature: "mkWrappedNFTPolicy :: BuiltinData -> BuiltinData -> BuiltinData -> BuiltinData -> BuiltinData -> ()" },
        { name: "nftCode", signature: "nftCode :: PlutusTx.CompiledCode" },
        { name: "nftPolicy", signature: "nftPolicy :: TxOutRef -> TokenName -> MintingPolicy" },
        { name: "saveNFTCode", signature: "saveNFTCode :: IO ()" }
    ];

    const missingFunctions = requiredFunctions.filter(func => {
        const functionRegex = new RegExp(`${func.name}\\s*::`, 'm');
        return !functionRegex.test(code);
    });

    if (missingFunctions.length > 0) {
        results.isValid = false;
        results.errors.push({
            type: "MISSING_FUNCTION",
            message: `Missing required function${missingFunctions.length > 1 ? 's' : ''}`,
            details: missingFunctions.map(f => f.name).join(', ')
        });
    }


    const bracketPairs = [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '{', close: '}' }
    ];

    bracketPairs.forEach(pair => {
        const openCount = (code.match(new RegExp(`\\${pair.open}`, 'g')) || []).length;
        const closeCount = (code.match(new RegExp(`\\${pair.close}`, 'g')) || []).length;

        if (openCount !== closeCount) {
            results.isValid = false;
            results.errors.push({
                type: "UNBALANCED_BRACKETS",
                message: `Unbalanced ${pair.open}${pair.close} pairs`,
                details: `Found ${openCount} '${pair.open}' and ${closeCount} '${pair.close}'`
            });
        }
    });

    return results;
}