export interface Member {
  id: string;
  name: string;
  phone: string;
  address: string;
  dob: string;
  date: string;
}

export const MEMBERS_STORAGE_KEY = "lions_members";
const MEMBERS_CHANGED_EVENT = "lions-members-changed";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readMembers(): Member[] {
  if (!isBrowser()) {
    return [];
  }

  const savedMembers = window.localStorage.getItem(MEMBERS_STORAGE_KEY);
  if (!savedMembers) {
    return [];
  }

  try {
    const members = JSON.parse(savedMembers) as Member[];
    if (!Array.isArray(members)) {
      return [];
    }

    return members.map((member) => ({
      ...member,
      dob: member.dob || "",
    }));
  } catch {
    return [];
  }
}

export function writeMembers(members: Member[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  window.dispatchEvent(new CustomEvent(MEMBERS_CHANGED_EVENT, { detail: members }));
}

export function subscribeToMembers(callback: () => void) {
  if (!isBrowser()) {
    return () => {};
  }

  const handleMembersChanged = () => callback();
  const handleStorage = (event: StorageEvent) => {
    if (event.key === MEMBERS_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener(MEMBERS_CHANGED_EVENT, handleMembersChanged);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(MEMBERS_CHANGED_EVENT, handleMembersChanged);
    window.removeEventListener("storage", handleStorage);
  };
}

