// uses Math.random which may only be pseudo random
export function uuidv4():string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
}
