import merge from 'lodash.merge';
import { ProfileDocument } from "../model/entity/profile.entity";

export function mergeAndMarkModified(
    doc: ProfileDocument,
    input: Partial<ProfileDocument>,
    pathsToMark: string[], // jetzt bewusst string[], damit auch "settings.blockedUsers" geht
): ProfileDocument {
    merge(doc, input); // Deep Merge

    for (const path of pathsToMark) {
        // Nur markieren, wenn dieser Pfad im Input enthalten ist oder sein Parent
        if (getValueAtPath(input, path) !== undefined) {
            doc.markModified(path);
        }
    }

    return doc;
}

// Hilfsfunktion: Holt einen verschachtelten Wert aus dem Input
function getValueAtPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
