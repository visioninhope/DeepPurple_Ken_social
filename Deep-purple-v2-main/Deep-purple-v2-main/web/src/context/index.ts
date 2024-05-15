import { TweetData } from "../types";
import { axiosInstance } from "../api/axios/config";

export function saveTweetData(tweetsData : TweetData[]){
    return axiosInstance.post('/analysis/savetweet', tweetsData);
}

export function getTweetData(){
    return axiosInstance.get('/analysis/gettweet');
}