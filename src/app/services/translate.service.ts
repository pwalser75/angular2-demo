import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class TranslateService {

    currentLanguage: string;
    supportedLanguages: any;
    translations: any[];

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

    loadLanguageResources(lang: string) {
        let resource: string = "app/localization/" + lang + ".json";
        console.log("Loading: " + resource);

        this.http.get(resource)
            .map((res: any) => res.json())
            .subscribe(
                data => this.translations[lang] = data,
                error => console.log(error)
            );
    }


    setLanguage(lang: string) {
        if (this.isSupportedLanguage(lang)) {
            this.currentLanguage = lang;
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

        if (key) {
            let languageMap = this.translations[this.currentLanguage];
            if (languageMap) {
                let value = languageMap[key.trim()];
                if (value) {
                    return value;
                }
            }
            return "?" + key + "[" + this.currentLanguage + "]?";
        }
    }
}