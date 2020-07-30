import { Post } from 'app/types';

interface Data {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export const Months = [
  'Jan',
  'Feb',
  'Mar',
  'April',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export function extractValues<T = Data>(keys: string[], obj: Data | Data[]): T[] {
  const reducedArr = Object.values(obj).map((curr) => {
    const normalised: T = {} as T;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    keys.forEach((key: string) => (normalised[key] = curr.data[key]));
    return normalised;
  });
  return reducedArr;
}

export const formatDate = (date: string): string => {
  const currentYear = new Date(date).getFullYear();
  const currentMonth = new Date(date).getMonth();
  const currentDate = new Date(date).getDate();
  return `${currentDate}/${Months[currentMonth]}/${currentYear}`;
};

export function queryByUpDate(data: Post[], input: number): Post[] {
  return data.filter((dataItem) => new Date(dataItem.created).getMonth() === input);
}

export function queryByUpVotes(data: Post[], input: number): Post[] {
  return data.filter((dataItem) => dataItem.ups < input);
}

export function queryByName(data: Post[], input: string): Post[] {
  if (input.length === 0) {
    return data;
  }
  if (/\w+/i.test(input)) {
    return data.filter((dataItem) => dataItem.title.includes(input.toLowerCase()));
  }
  return [];
}
