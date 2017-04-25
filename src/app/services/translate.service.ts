import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export enum TranslateServiceEventType {
    LANGUAGE_LOADED,
    LANGUAGE_CHANGED
}

export class TranslateServiceEvent {
    constructor(public type: TranslateServiceEventType, public data: any) {
    }
}

@Injectable()
export class TranslateService {

    private currentLanguage: string;
    private supportedLanguages: any;
    private loadedLanguages: any[];
    private translations: any[];

    private eventSource: Subject<TranslateServiceEvent> = new Subject<TranslateServiceEvent>();
    public events: Observable<TranslateServiceEvent> = this.eventSource.asObservable();

    constructor(private http: Http) {
        this.supportedLanguages = {
            "en": "English",
            "de": "Deutsch"
        };
        this.currentLanguage = 'en';
        this.translations = [];

        for (let lang of this.getSupportedLanguages()) {
            this.loadLanguageResources(lang);
        }
    }

    loadLanguageResources(lang: string): void {
        let resource: string = "app/localization/" + lang + ".json";
        console.log("Loading: " + resource);

        this.http.get(resource)
            .map((res: any) => res.json())
            .subscribe(
                data => {
                    this.translations[lang] = data;
                    this.emitEvent(new TranslateServiceEvent(TranslateServiceEventType.LANGUAGE_LOADED, lang));
                },
                error => console.log(error)
            );
    }

    setLanguage(lang: string): void {
        if (this.isSupportedLanguage(lang) && this.currentLanguage != lang) {
            this.currentLanguage = lang;
            this.emitEvent(new TranslateServiceEvent(TranslateServiceEventType.LANGUAGE_CHANGED, lang));
        }
    }

    getLanguage(): string {
        return this.currentLanguage;
    }

    isCurrentLanguage(lang: string): boolean {
        return this.currentLanguage === lang;
    }

    getSupportedLanguages(): string[] {
        var keys = [];
        for (let lang in this.supportedLanguages) {
            keys.push(lang);
        }
        return keys;
    }

    isSupportedLanguage(lang: string): boolean {
        return this.getSupportedLanguages().indexOf(lang) >= 0;
    }

    getLanguageName(lang: string): string {
        return this.supportedLanguages[lang];
    }

    translate(key: string): string {

        if (!key) return null;
        let languageMap = this.translations[this.currentLanguage];
        if (!languageMap) {
            // not yet loaded
            return '...';
        }
        if (key) {
            let value: any = languageMap;
            for (let part of key.split(".")) {
                value = value ? value[part] : null;
            }
            if (value) {
                var linkRegex = /->\s*([^\s]+)\s*/g;
                var match = linkRegex.exec(value);
                return (match) ? this.translate(match[1]) : value;
            }

            console.error("No translation found for '" + key + "' in language '" + this.currentLanguage + "'");
            return "?" + key + "[" + this.currentLanguage + "]?";
        }
    }

    replacePlaceholders(text: string, replacements: any): string {
        if (!text || !replacements) {
            return text;
        }
        for (let placeholder in replacements) {
            text = text.replace("${" + placeholder + "}", replacements[placeholder]);
        }
        return text;
    }

    private emitEvent(event: TranslateServiceEvent) {
        if (this.eventSource && event) {
            this.eventSource.next(event);
        }
    }
}