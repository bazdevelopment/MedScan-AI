import ar from '@/translations/ar.json';
import ca from '@/translations/ca.json';
import cs from '@/translations/cs.json';
import da from '@/translations/da.json';
import de from '@/translations/de.json';
import el from '@/translations/el.json';
import en from '@/translations/en.json';
import es_spain from '@/translations/es-ES.json';
import es_mexico from '@/translations/es-MX.json';
import fi from '@/translations/fi.json';
import fr from '@/translations/fr.json';
import fr_canada from '@/translations/fr-CA.json';
import he from '@/translations/he.json';
import hi from '@/translations/hi.json';
import hr from '@/translations/hr.json';
import hu from '@/translations/hu.json';
import id from '@/translations/id.json';
import it from '@/translations/it.json';
import ja from '@/translations/ja.json';
import ko from '@/translations/ko.json';
import ms from '@/translations/ms.json';
import nl from '@/translations/nl.json';
import no from '@/translations/no.json';
import pl from '@/translations/pl.json';
import pt_brazil from '@/translations/pt-BR.json';
import pt_portugal from '@/translations/pt-PT.json';
import ro from '@/translations/ro.json';
import ru from '@/translations/ru.json';
import sk from '@/translations/sk.json';
import sv from '@/translations/sv.json';
import th from '@/translations/th.json';
import tr from '@/translations/tr.json';
import uk from '@/translations/uk.json';
import vi from '@/translations/vi.json';
import zh from '@/translations/zh.json';

export const resources = {
  en: { translation: en },
  zh: { translation: zh },
  hi: { translation: hi },
  'es-ES': { translation: es_spain },
  'es-MX': { translation: es_mexico },
  ar: { translation: ar },
  fr: { translation: fr },
  'fr-CA': { translation: fr_canada },
  'pt-BR': { translation: pt_brazil },
  'pt-PT': { translation: pt_portugal },
  de: { translation: de },
  ja: { translation: ja },
  ru: { translation: ru },
  ko: { translation: ko },
  it: { translation: it },
  tr: { translation: tr },
  vi: { translation: vi },
  pl: { translation: pl },
  uk: { translation: uk },
  ro: { translation: ro },
  nl: { translation: nl },
  cs: { translation: cs },
  el: { translation: el },
  sv: { translation: sv },
  hu: { translation: hu },
  th: { translation: th },
  he: { translation: he },
  id: { translation: id },
  ms: { translation: ms },
  fi: { translation: fi },
  da: { translation: da },
  no: { translation: no },
  sk: { translation: sk },
  hr: { translation: hr },
  ca: { translation: ca },
};

export type Language = keyof typeof resources;
