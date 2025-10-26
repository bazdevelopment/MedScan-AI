import { ITranslation } from './types';

export const fi: ITranslation = {
  common: {
    welcome: 'Tervetuloa',
    error: 'Tapahtui virhe',
    loading: 'Ladataan...',
    noUserFound:
      'Sinulla ei ole oikeutta tehdä tätä pyyntöä. Ole hyvä ja kirjaudu sisään',
    userIdMissing:
      'Käyttäjätunnus näyttää puuttuvan. Ole hyvä ja anna se jatkaaksesi',
    scanLimitReached:
      'Olet saavuttanut sallittujen skannausten enimmäismäärän. Ole hyvä ja päivitä suunnitelmasi jatkaaksesi palvelun käyttöä',
    mandatoryLanguage: 'Kielikoodi on pakollinen',
  },
  auth: {
    signIn: 'Kirjaudu sisään',
    signUp: 'Rekisteröidy',
  },

  loginUserViaEmail: {
    mandatoryEmail: 'Ole hyvä ja anna sähköpostiosoitteesi jatkaaksesi',
    invalidEmail:
      'Annettu sähköpostiosoite on virheellinen. Ole hyvä ja tarkista se ja yritä uudelleen',
    accountCreated:
      'Tilisi on luotu onnistuneesti! Ole hyvä ja tarkista sähköpostisi vahvistuskoodia varten',
    verificationCodeSent:
      'Olemme lähettäneet vahvistuskoodin sähköpostiisi. Ole hyvä ja tarkista saapuneet viestit',
    internalError:
      'Sähköpostitunnistautumisesi käsittelyssä tapahtui virhe. Ole hyvä ja yritä uudelleen',
  },

  sendEmailVerification: {
    emailMandatory: 'Sähköpostiosoite vaaditaan jatkaaksesi',
    emailUsed:
      'Tätä sähköpostiosoitetta käytetään jo. Ole hyvä ja käytä toista',
    userNotFound:
      'Emme löytäneet määritettyä käyttäjää. Ole hyvä ja tarkista tietosi ja yritä uudelleen',
    verificationCodeSent:
      'Vahvistuskoodi on lähetetty onnistuneesti sähköpostiisi',
    generalError: 'Sähköpostivahvistuksen aloittamisessa tapahtui virhe',
  },

  getInterpretationByDate: {
    startEndDateRequired: 'Aloitus- ja lopetuspäivämäärä vaaditaan.',
    startDatePriority:
      'Aloituspäivämäärä ei voi olla lopetuspäivämäärän jälkeen.',
    generalError: 'Analyysien noutaminen epäonnistui.',
  },

  verifyAuthenticationCode: {
    authCodeMandatory: 'Tunnistautumiskoodi on pakollinen jatkaaksesi',
    emailAddressMandatory: 'Sähköpostiosoite on pakollinen jatkaaksesi',
    userNotFound:
      'Määritettyä käyttäjää ei löytynyt. Ole hyvä ja tarkista tietosi ja yritä uudelleen',
    invalidAuthCode:
      'Hups! Tämä ei ole kelvollinen tunnistautumiskoodi. Ole hyvä ja tarkista se ja yritä uudelleen!',
    authCodeExpired:
      "Hups! Koodisi on vanhentunut. Ole hyvä ja yritä kirjautua uudelleen sähköpostiosoitteellasi tai napsauta 'Lähetä koodi uudelleen'",
    authCodeVerified: 'Käyttäjä on vahvistettu onnistuneesti',
    generalError: 'Hups! Koodisi vahvistamisessa tapahtui virhe',
  },

  analyzeImage: {
    scanLimitReached:
      'Olet saavuttanut sallittujen skannausten enimmäismäärän. Ole hyvä ja päivitä suunnitelmasi jatkaaksesi palvelun käyttöä',
    imageMissing: 'Kuva puuttuu. Ole hyvä ja valitse ja lataa kuva jatkaaksesi',
    uploadImageStorageError:
      'Kohdattiin virhe kuvan latauksessa. Ole hyvä ja tarkista yhteytesi ja yritä uudelleen',
    interpretationNotSaved:
      'Analyysitulosta ei voitu tallentaa. Ole hyvä ja tarkista yhteytesi ja yritä uudelleen',
    analysisCompleted: 'Kuvan analysointi suoritettu onnistuneesti!',
  },
  analyzeVideo: {
    noVideoFound:
      'Videotiedosto puuttuu. Ole hyvä ja valitse ja lataa video jatkaaksesi',
    uploadVideoStorageError:
      'Kohdattiin virhe videon latauksessa. Ole hyvä ja tarkista yhteytesi ja yritä uudelleen',
    interpretationNotSaved:
      'Analyysitulosta ei voitu tallentaa. Ole hyvä ja tarkista yhteytesi ja yritä uudelleen',
    analysisCompleted: 'Videon analysointi suoritettu onnistuneesti!',
  },

  incrementUsersScans: {
    incrementSuccessScan: 'Yksi skannaus lisää on käytetty',
    generalError: 'Skannausten määrän lisääminen epäonnistui!',
  },
  decrementUserScans: {
    decrementSuccessScan: 'Yksi skannaus on vähennetty',
    decrementErrorScan:
      'Skannausten määrän päivityksessä tapahtui ongelma. Ole hyvä ja yritä myöhemmin uudelleen',
    generalError: 'Skannausten määrän vähentäminen epäonnistui!',
  },
  updateUserSubscription: {
    subscribeSuccess: 'Tilaus onnistui!',
    updateSubscriptionError: 'Käyttäjän tilauksen päivitys epäonnistui!',
  },
  updateUserLanguage: {
    updateSuccess: 'Kieli päivitetty onnistuneesti!',
    updateError:
      'Kielen päivityksessä tapahtui odottamaton virhe. Ole hyvä ja yritä myöhemmin uudelleen',
  },

  getUserInfo: {
    successGetInfo: 'Käyttäjätietojen haku onnistui',
    errorGetInfo:
      'Käyttäjätietojen noutamisessa tapahtui odottamaton virhe. Ole hyvä ja yritä myöhemmin uudelleen',
  },
  getUserInfoById: {
    noUserInfoData:
      'Käyttäjäasiakirja on olemassa, mutta tietoja ei ole saatavilla',
    getUserFetchError: 'Käyttäjätietojen noutamisessa tapahtui virhe',
  },

  updateScanInterpretation: {
    success: 'Skannauksen tulkintatietue päivitetty onnistuneesti!',
    generalError: 'Skannauksen tulkinnan päivityksessä tapahtui virhe',
    paramsRequired: "Sekä 'documentId' että 'fieldsToUpdate' vaaditaan",
  },
  deleteScanInterpretation: {
    success: 'Raportti on poistettu onnistuneesti!',
    documentIdRequired: "'DocumentId' vaaditaan jatkaaksesi.",
    generalError:
      'Raportin poistamisessa tapahtui virhe. Ole hyvä ja yritä uudelleen.',
  },

  getInterpretationByDocumentId: {
    paramsRequired: "'DocumentId' vaaditaan",
    noDocIdFound: 'Annettua tunnistetta vastaavaa asiakirjaa ei löytynyt',
    success: 'Asiakirja haettu onnistuneesti',
    generalError:
      'Annettua asiakirjatunnistetta vastaavan tulkinnan noutamisessa tapahtui virhe',
  },

  getRecentInterpretation: {
    limitRequired: 'Rajan on oltava numero 1 ja 100 välillä',
    noInterpretationFound: 'Tulkintoja ei löytynyt',
    success: 'Viimeisimmät tulkinnat haettu onnistuneesti!',
    generalError: 'Viimeisimpien tulkintojen noutamisessa tapahtui virhe',
    generalErrorAdditional: 'Tapahtui palvelimen sisäinen virhe',
  },

  storeDeviceToken: {
    deviceTokenRequired: 'Laitetunnuksen antaminen on pakollista.',
    generalError: 'Virhe laitetunnuksen tallennuksessa',
  },

  sendGlobalPushNotifications: {
    requiredParams: 'Ilmoituksen otsikko ja sisältö ovat pakollisia.',
    generalError: 'Ilmoitusten käsittelyssä tapahtui virhe',
    generalErrorAdditional: 'Maailmanlaajuisen ilmoituksen lähetys epäonnistui',
  },

  checkDeviceUniqueIdentifier: {
    deviceMandatory: 'Laitetunniste on pakollinen',
    languageMandatory: 'Kieli on pakollinen',
    deviceIdentified: 'Laitteesi on tunnistettu onnistuneesti',
    generalError: 'Laitteen kokeilujakson tarkistuksessa tapahtui virhe',
  },

  getUserNotification: {
    generalError: 'Käyttäjäilmoitusten noutaminen epäonnistui',
    generalErrorAdditional: 'Käyttäjäilmoitusten noutamisessa tapahtui virhe',
  },

  getScanCategories: {
    noCategoryFound: 'Kategorioita ei löytynyt',
    generalError: 'Skannauskategorioiden noutamisessa tapahtui virhe',
  },

  uploadScanCategories: {
    successfullyUploaded: 'Skannauskategoriat ladattu onnistuneesti',
    generalError: 'Skannauskategorioiden lataus epäonnistui',
  },

  sendUserNotification: {
    noTokenFound:
      'Kelvollisia Expo-tunnuksia ei löytynyt. Ilmoituksia ei voi lähettää',
    generalError: 'Ilmoituksen lähetys epäonnistui',
  },

  updateUser: {
    successUpdatedUser: 'Käyttäjä päivitetty onnistuneesti',
    updateUserError:
      'Käyttäjätietueen päivitys epäonnistui. Ole hyvä ja yritä uudelleen.',
  },

  loginUserAnonymously: {
    mandatoryUsername: 'Valitse nimimerkki ja aloitetaan!',
    userLoggedIn: 'Tervetuloa takaisin! Olet kirjautunut sisään.',
    accountCreated: 'Olet kirjautunut sisään! Nauti tutkinnasta!',
    error:
      'Hups! Jotain meni pieleen. Ole hyvä ja tarkista yhteytesi ja yritä uudelleen.',
  },
  continueConversation: {
    messagesLimit:
      'Aria on täydellä kapasiteetilla! Lataa toinen skannaus jatkaaksesi analyysien ja oivallusten saamista',
    conversationNotFound: 'Keskustelua ei löytynyt',
    serviceIssueAi:
      'Näyttää siltä, että tekoälypalvelussa on ongelma. Ole hyvä ja yritä uudelleen.',
    noResponseAiService:
      'Tekoälypalvelusta ei saatu kelvollista vastausta. Ole hyvä ja yritä uudelleen',
  },
};
