import { arSa } from "./ar-SA";
import { bnBd } from "./bn-BD";
import { ca } from "./ca-ES";
import { de } from "./de-DE";
import { enGb } from "./en-GB";
import { en } from "./en-US";
import { es } from "./es-ES";
import { fr } from "./fr-FR";
import { hiIn } from "./hi-IN";
import { idId } from "./id-ID";
import { itIt } from "./it-IT";
import { jaJp } from "./ja-JP";
import { koKr } from "./ko-KR";
import { nlNl } from "./nl-NL";
import { plPl } from "./pl-PL";
import { ptBr } from "./pt-BR";
import { ptPt } from "./pt-PT";
import { ruRu } from "./ru-RU";
import { svSe } from "./sv-SE";
import { thTh } from "./th-TH";
import { trTr } from "./tr-TR";
import { ukUa } from "./uk-UA";
import { urPk } from "./ur-PK";
import { viVn } from "./vi-VN";
import { zhCn } from "./zh-CN";
import { zhTw } from "./zh-TW";

export type TranslationKey = keyof typeof en;
export type TranslationDictionary = Record<TranslationKey, string>;

export const translations = {
  "ar-SA": arSa,
  "bn-BD": bnBd,
  "ca-ES": ca,
  "de-DE": de,
  "en-GB": enGb,
  "en-US": en,
  "es-ES": es,
  "fr-FR": fr,
  "hi-IN": hiIn,
  "id-ID": idId,
  "it-IT": itIt,
  "ja-JP": jaJp,
  "ko-KR": koKr,
  "nl-NL": nlNl,
  "pl-PL": plPl,
  "pt-BR": ptBr,
  "pt-PT": ptPt,
  "ru-RU": ruRu,
  "sv-SE": svSe,
  "th-TH": thTh,
  "tr-TR": trTr,
  "uk-UA": ukUa,
  "ur-PK": urPk,
  "vi-VN": viVn,
  "zh-CN": zhCn,
  "zh-TW": zhTw,
} satisfies Record<string, TranslationDictionary>;

export type Language = string;
