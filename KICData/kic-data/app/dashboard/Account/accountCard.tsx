"use client";
import { useState, useEffect, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  AccountCircle,
  Lock,
  AccessTime,
  Update,
  Star,
  ArrowDropDown,
  Share,
  ShareRounded,
  Outbound,
  OutboundRounded,
} from "@mui/icons-material";

import { ensureHttps, getIconUrl } from "@/components/getIcons";
import { Button, Code, Image } from "@nextui-org/react";
import {Filter} from "./page";
import {fuzzyDomainMatch} from "@/app/helpers/XXRSAgent/matcher";
import {timestampToTime} from "@/app/helpers/XXRSAgent/setCookies";

export interface Cookie {
  key: string;
  creation_utc: number;
  host_key: string;
  name: string;
  value: string;
  expires_utc: number | string;
  encrypted_value: string | null;
  last_access_utc: number;
  last_update_utc: number;
  expires_time: string;
  last_access_time: string;
  last_update_time: string;
}
export interface CookieFilter {
  creation_utc?: number;
  host_key?: string;
  name?: string;
  value?: string;
  expires_utc?: number | string;
  encrypted_value?: string | null;
  last_access_utc?: number;
  last_update_utc?: number;
  expires_time?: string;
  last_access_time?: string;
  last_update_time?: string;
}

interface CookiesAccountProps {
  cookie: Cookie;
  deleted?: string[];
  filter?: Filter;
  isFavorite: boolean;
  keys: string;
  disbaleTouch?:()=>boolean;
  linkModal:any;
  setLinkModal :any
  onAddFav: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  onDelete: any;
  selected:"All" | "Connected" | "Disconnected"
}

const CookiesAccountPage = ({
  cookie,
  isFavorite,
  filter,
  deleted,
  onDelete,
  disbaleTouch,
  onAddFav,
  keys,
  linkModal ,
  setLinkModal,
  selected
}: CookiesAccountProps) => {
  
  
  const router = useRouter();

  const [updatedCookies, setUpdatedCookies] = useState<Cookie>({
    ...cookie,
  });

  useEffect(() => {
  
    const updateExpiryTime = () => {
      setUpdatedCookies((cookies: Cookie) => {
        return {
          ...cookies,
          expires_utc: calculateExpiryTime(cookie.expires_time),
        };
      });
    };
    updateExpiryTime();
    const intervalId = setInterval(updateExpiryTime, 1000);
    return () => clearInterval(intervalId);
  }, [cookie,filter?.Date,filter?.Search,filter?.Host,filter?.filter]);

  const calculateExpiryTime = (expiryUtc: string) => {
    const expirationDate = Date.parse(expiryUtc); // Convert expiry timestamp to milliseconds
    const currentTime = Date.now(); // Current time

    // Calculate the time difference in milliseconds
    const timeDifference = expirationDate - currentTime;

    // Check if the cookie has already expired
    if (timeDifference <= 0) {
      return "Expired"; // Return "Expired" if the cookie has expired
    }

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Construct the expiry time string
    let expiryTime = "";
    if (days > 0) {
      expiryTime += days + "days : ";
    }
    if (hours > 0) {
      expiryTime += hours + "hour : ";
    }
    if (minutes > 0) {
      expiryTime += minutes + "minutes:";
    }
    if (seconds > 0) {
      expiryTime += seconds + "seconds";
    }

    return expiryTime;
  };
  if(selected == 'Connected' && deleted?.includes(cookie.key)){
    return 
  }
  if(selected == 'Disconnected' && !deleted?.includes(cookie.key)){
    return 
  }
  if(selected !== 'Disconnected'  && deleted && deleted.includes(cookie.key)){
    return 
  }
  if(filter?.filter == 'Watch Cookies' && !isFavorite){
    return null
     
  }
  else if(filter?.filter == 'Before Date' && !(parseFloat(filter.Date) > Date.parse(cookie.last_access_time))){
    // console.log(parseFloat(filter.Date) , Date.parse(cookie.last_access_time),'After')
    return null
    
  }
  else if(filter?.filter == 'After Date' && (parseFloat(filter.Date) < Date.parse(cookie.last_access_time))){
    // console.log(parseFloat(filter.Date) , Date.parse(cookie.last_access_time),'After beofre')
    return null
      
  }
  else if (filter?.filter == 'Host'  && !fuzzyDomainMatch(filter.Host??"" , cookie.host_key??"")){
    // console.log(filter.Host , keys)
    return null
  }
  else if (filter?.filter == 'Search'  && !(cookie.host_key.includes(filter.Search))){
    console.log(filter.Search ,cookie.host_key ,fuzzyDomainMatch(filter.Search ??'', cookie.host_key??""))
    return   null
  }
  if (!cookie.host_key.startsWith(".")) {
    return (
      <div className="relative duration-75  hover:scale-[95%] bg-white p-4 mt-4 rounded-lg shadow-lg w-96">
        <div className="flex space-x-3 top-0 right-0 mx-72">

          <div
            onClick={() => {
              onAddFav((e: any) => {
                return e
                  ? e.includes(keys)
                    ? e.filter((fav_: string) => fav_ !== keys)
                    : [...e, keys]
                  : [];
              });
            }}
          >
            {isFavorite ? <Star color="warning" /> : <Star color="disabled" />}
          </div>
          <div className="rotate-[0deg] text-amber-500" >
            <OutboundRounded />
          </div>
        </div>
        {linkModal.key == cookie.key && linkModal.value && (
          <div className="flex flex-col items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
            <div className="bg-white shadow-2xl  shadow-blue-900   rounded-lg w-full  max-w-[450px] sm:w-[500px] py-10 px-5 flex flex-col space-x-5 items-center place-items-center justify-center h-[300px]">
              <div className="text-[14px] text-blue-600 font-[500] ">
                <h1>
                  You are about to sign out, we will redirect you to <Code color="danger">{cookie.host_key}</Code>
                  For security reasons, we recommend signing out manually.
                 
                  This action is necessary due to third-party data policies. Please note that we can't sign you out without explicit consent from their database.

                </h1>
              </div>
              <div className="w-full space-x-5 flex mt-24">
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 w-full "
                  onClick={() => {
                    setLinkModal({key:cookie.key, value:false});
                  }}
                >
                  cancel
                </Button>
                <Button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 w-full"
                  onClick={() => {
                    setLinkModal({key:cookie.key, value:false});
                  }}
                >
                  <a href={ensureHttps(cookie.host_key)}>Sign Out</a>
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex items-center mb-2">
          <Image
            className="w-8 h-8 mr-2"
            alt="favicon"
            src={getIconUrl(cookie.host_key)}
            width={300}
            height={100}
          />
          <p className="text-blue-500">
            <p>Host Key</p>
            <p> {cookie.host_key}</p>
          </p>
        </div>
        <div className="flex items-center mb-2 text-[14px]">
          <AccountCircle sx={{ fontSize: 20 }} className="text-blue-500 mr-2" />
          <p className="text-blue-500">Value: {cookie.value}</p>
        </div>
        <div className="flex items-center mb-2">
          <Update sx={{ fontSize: 20 }} className="text-blue-500 mr-2" />
          <p className="text-blue-500 text-[14px]">
            Time Sigin: {timestampToTime(cookie.creation_utc).replaceAll('T'," ").replace('Z','').split('.')[0]}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <AccessTime sx={{ fontSize: 20 }} className="text-blue-500 mr-2" />
          <p className="text-blue-500 text-[12px]">
            Expires Time: {calculateExpiryTime(cookie.expires_time).replaceAll('T'," ").replace('Z','').split('.')[0]}
          </p>
        </div>
      
        <div className="flex items-center mb-2">
          <Update sx={{ fontSize: 20 }} className="text-blue-500 mr-2" />
          <p className="text-blue-500 text-[14px]">
            Last Time Updated: {cookie.last_update_time.replaceAll('T'," ").replace('Z','').split('.')[0]}
          </p>
        </div>
         
       
        <div className="flex items-center mb-2">
          <Update sx={{ fontSize: 20 }} className="text-blue-500 mr-2" />
          <Code color="success" className="text-blue-500">
            Last Time Accessed: {cookie.last_access_time.replaceAll('T'," ").replace('Z','').split('.')[0]}
          </Code>
        </div>
        <div className="flex items-center justify-end mt- space-x-3">
          <button
            className="bg-danger-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            onClick={() => {
              onDelete((e: any) => {
                return [...e, cookie.key]
              });
            }}
          >
            Disconnect
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            onClick={() => {
              setLinkModal({key:cookie.key,value:true});
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }
};

export { CookiesAccountPage as CookiesAccount };
