interface Data {
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
  let reducedArr = Object.values(obj).map((curr) => {
    let normalised: T = {} as T;
    //@ts-ignore
    keys.forEach((key: string) => (normalised[key] = curr.data[key]));
    return normalised;
  });
  return reducedArr;
}

export const formatDate = (date: string) => {
  const currentYear = new Date(date).getFullYear();
  const currentMonth = new Date(date).getMonth();
  const currentDate = new Date(date).getDate();
  return `${currentDate}/${Months[currentMonth]}/${currentYear}`;
};

export function queryByUpDate(data: any[], input: number): any[] {
  return data.filter((dataItem) => new Date(dataItem.created).getMonth() === input);
}

export function queryByUpVotes(data: any[], input: number): any[] {
  return data.filter((dataItem) => dataItem.ups < input);
}

export function queryByName(data: any[], input: string): any[] {
  if (input.length === 0) {
    return data;
  }
  if (/\w+/.test(input)) {
    return data.filter((dataItem) => dataItem.title.includes(input));
  }
  return [];
}
