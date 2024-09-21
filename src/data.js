export const API_KEY = 'AIzaSyCgcp6XO9cI9hHmhgyPgHoyr_a1f3gCvXA';

export const formatViews = (views) => {
    if(views >= 1000000){
        return Math.floor(views/1000000) + 'M'
    }
    else if(views>=1000){
        return Math.floor(views/1000) + 'K'
    }
    else {
        // return `${(views / 1_000_000_000).toFixed(1)}B`;
        return views
    }
};