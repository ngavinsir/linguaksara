import { writable, derived } from "svelte/store"
import cookie from "js-cookie"

export const jwt = createJwt();
export const type = createType();
export const showHistory = writable(false);
export const article = writable(null);
export const modal = writable(null);
export const landing = writable(true);
export const history = createHistory();
export const user = derived(
	jwt,
	$jwt => {
        if($jwt) return JSON.parse(window.atob($jwt.split(".")[1]));
        else return {};
    }
);
export const onboardingStep = writable(null);
export const doneOnboarding = createDoneOnboarding();

function createDoneOnboarding() {
  const cookieDoneOnboarding = cookie.get("doneOnboarding"); 
  const { subscribe, set } = writable(cookieDoneOnboarding ? cookieDoneOnboarding : false);

  return {
    subscribe,
    set: (doneOnboarding) => {
      set(doneOnboarding);
      if(doneOnboarding) cookie.set("doneOnboarding", doneOnboarding)
      else cookie.remove("doneOnboarding");
    }
  }
}

function createJwt() {
    const cookieExist = cookie.get("jwt") !== undefined && cookie.get("jwt");
	const { subscribe, set } = writable(cookieExist ? cookie.get("jwt") : "");

	return {
		subscribe,
		set: (jwt) => {
            set(jwt);
            if(jwt) cookie.set("jwt", jwt);
            else cookie.remove("jwt");
        }
	};
}

function createHistory() {
	const { subscribe, update, set } = writable([]);

	return {
        subscribe,
        set,
		add: (label) => {
            update(history => [...history, label])
        },
        delete: (labelID) => {
            update(history => history.filter(h => h.label.id !== labelID))
        }
	};
}

function createType() {
    const cookieExist = cookie.get("type") !== undefined && cookie.get("type");
	const { subscribe, set } = writable(cookieExist ? cookie.get("type") : "clickbait");

	return {
		subscribe,
		set: (type) => {
            set(type);
            if(type) cookie.set("type", type);
            else cookie.remove("type");
        }
	};
}
