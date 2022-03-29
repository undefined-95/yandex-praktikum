import { format, formatRelative, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export function setCookie(
  name: string,
  value: string | number | boolean | null,
  props?: any
) {
  props = props || { path: '/', ...props };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (value) {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export function formatDate(date: string) {
  const dateToWords = formatRelative(parseISO(date), new Date(), {
    locale: ru,
  });
  const time = format(parseISO(date), "HH:mm'  'O");
  if (time.charAt(0) === '0') {
    return (
      dateToWords.charAt(0).toUpperCase() +
      dateToWords.slice(1, -5) +
      ' ' +
      time
    );
  }
  return dateToWords.charAt(0).toUpperCase() + dateToWords.slice(1, -5) + time;
}
