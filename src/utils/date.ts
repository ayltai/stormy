export const getPartOfDay = (date : number) : 'day' | 'night' => {
    const hours = new Date(date).getHours();
    return hours >= 6 && hours < 18 ? 'day' : 'night';
};
