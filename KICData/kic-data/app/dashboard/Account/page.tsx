"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  Input,
  Modal,
  Select,
  Code,
  Tab,
  Tabs,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  useDisclosure,
  SelectItem,
  Divider,
  Spinner,
  ScrollShadow,
  Pagination,
} from "@nextui-org/react";

import { getIconUrl } from "@/components/getIcons"; // Ensure this function is correctly implemented.
import { link } from "fs";
import { Add } from "@mui/icons-material";
import { postData } from "@/app/helpers/XXRSAgent/setCookies";

import { Cookie, CookiesAccount } from "./accountCard";
import { signOut, useSession } from "next-auth/react";
import { accessToken, getCookies, isSigIn } from "@/app/helpers/authenticate";
import { useRouter } from "next/navigation";
import { prev } from "cheerio/lib/api/traversing";
import next from "next";
import { randomUUID } from "crypto";
import { clearConsent } from "../layout";

export interface LinkWebsite {
  link: string;
  name: string;
  connected: string;
}

type Computer = "Mac" | "Window" | undefined;
type Browser = "Chrome" | "Edges" | "FireFox" | undefined;
interface CookiesSelectionInfo {
  AppDataRoot: string;
  computer: Computer;
  browser: Browser;
  cookies: File | "";
}

export interface Filter {
  Search?: any;
  Host?: any;
  Date?: any;
  filter?:
    | "Search"
    | "Host"
    | "Date"
    | "Watch Cookies"
    | "Before Date"
    | "After Date";
}
export default function Accounts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [webLinks, setWebLinks] = useState<LinkWebsite[]>([]);
  const [selected, setSelected] = useState<string>("All");
  const [webLink, setWebLink] = useState("");
  const [browser, setBrowser] = useState<Browser>("Chrome");
  const [cookieFile, setCookieFile] = useState<File | "">();
  const [webName, setWebName] = useState("");
  const [Delete, setDelete] = useState<string[]>([]);
  const [fav, setFav] = useState<string[]>();
  const [screen, setScreen] = useState<number>(0);
  const [Cookies, setCookies] = useState<Cookie[]>([]);
  const [connected, setConnected] = useState<string>("Disconnected");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [Host, setHost] = useState<string[]>([]);
  const [filter, setFilter] = useState<Filter>();
  const router = useRouter();
  const [linkModal, showLinksModal] = useState({ key: "", value: false });
  const [firsts, setFirst] = useState(true);
  const [linksList, setNewLinkList] = useState<string[]>();
  const [renderList, setRenderedList] = useState<string[]>([]);
  const [cookiesInfo, setCookiesInfo] = useState<CookiesSelectionInfo>({
    AppDataRoot: "",
    computer: "Mac",
    browser: "Chrome",
    cookies: "",
  });
  const [cookiesSet, cookiesSetSuccessfully] = useState<boolean | null>(null);
  const { data, update } = useSession();

  const readFileContents = async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("file", file);
      const cookies = await uploadFileAndProcessCookies(formData);
      setCookies(cookies ? cookies : []);
      setHost((host: string[]) => {
        return cookies.map((cookies_) => {
          return cookies_.host_key.replace("www", "");
        });
      });
      setPage(cookies.length);
      if (data && data.user)
        localStorage.setItem("cookie", JSON.stringify(cookies));
    } catch (error) {
      setError("Failed to process cookies file");
    } finally {
      setLoading(false);
    }
  };

  const Group = (_Cookies: Cookie[] | typeof Cookies) => {
    console.log(_Cookies);
    const host: string[] = [];
    _Cookies =
      (_Cookies instanceof Array && _Cookies) ||
      ((_Cookies as any)?.cookies ?? []);
    for (let _cookies of _Cookies ? _Cookies : []) {
      if (_cookies.host_key.startsWith(".")) continue;
      if (host.includes(_cookies.host_key.replace("www", "") ?? "")) {
        continue;
      }
      host.push(_cookies.host_key.replace("www", "") ?? "");
    }
    console.log(host, typeof host, "plege");
    return host;
  };
  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("consent") && firsts) {
      onOpen();
      setScreen(1);
      setFirst(false);
    }
    if (localStorage.getItem("cookie") ?? false) {
      const _Cookies: Cookie[] =
        JSON.parse(localStorage.getItem("cookie") ?? "[]") ?? [];
      setCookies(_Cookies ?? []);
      setHost((e) => Group(_Cookies ? _Cookies : []));
      setTotalPage(_Cookies?.length);
    } else {
      fetchData();
      setHost((host: string[]) => {
        return Cookies?.map((cookies_) => {
          return cookies_?.host_key?.replace("www", "");
        });
      });
      console.log(Cookies, Host, "pop205");
    }
    setLoading(false);
  }, [localStorage.getItem("consent"), linksList]);

  const fetchData = () => {
    getCookies((data as any).user.refreshToken, page.toString()).then(
      (cookies_: Array<Cookie>) => {
        if (!cookies_.length) {
          return;
        }
        const new_cookies = [...cookies_];
        setCookies(new_cookies ? new_cookies : []);
        setTotalPage(new_cookies.length);
        localStorage.setItem("cookie", JSON.stringify(new_cookies));
      }
    );
  };
  const uploadFileAndProcessCookies = async (
    fileBuffer: FormData
  ): Promise<Cookie[]> => {
    if (
      !(await isSigIn(data && data.user && (data?.user as any).refreshToken))
    ) {
      signOut();
      clearConsent();
      router.push("/auth/login");
    }
    try {
      const response = await fetch(
        "https://xpiral.pythonanywhere.com/process/",
        {
          method: "POST",
          body: fileBuffer,
          headers: {
            // "Content-Type": "multipart/form-data",
            attempts: page as unknown as string,
            authorization: `JWT ${
              (await accessToken(
                (data && data.user && (data?.user as any).refreshToken) || ""
              )) || null
            }`,
          },
        }
      );

      console.log(
        "qweKiop",
        (data && data.user && (data?.user as any).refreshToken) || null
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      return (await response.json())["cookies"];
    } catch (error) {
      throw new Error("Failed to process file");
    }
  };

  const FilterCookies = (
    type: "Search" | "Host" | "Date" | "Filter" | "filter",
    key: string | number
  ) => {
    console.log(key, "pops");
    setFilter(() => {
      return {
        ...filter,
        filter: type,
        [type]: key,
      };
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      setScreen(9);
      setLoading(true);
      readFileContents(file);
      router.refresh();
    }
  };

  return (
    <div className="w-full">
      {loading && (
        <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
          <div className="bg-white shadow-2xl shadow-blue-900   rounded-md w-full  max-w-[450px] sm:w-[500px] flex space-x-5 items-center place-items-center justify-center h-[300px]">
            <Spinner color="secondary" />
            <h1 className="text-purple-800 font-[600]">
              Preparing Your Database.....
            </h1>
          </div>
        </div>
      )}

      <div className="bg-teal-50 mt-1 rounded-md w-full flex items-center justify-center">
        <Tabs
          color="secondary"
          aria-label="Tabs colors"
          radius="full"
          onSelectionChange={setSelected}
          selectedKey={selected}
        >
          <Tab key="All" title="All" />
          {/* <Tab key="connected" title="Connected" /> */}
          {/* <Tab key="Disconnected" title="Disconnected" /> */}
        </Tabs>
      </div>
      <div className="bg-teal-50 flex flex-col justify-center items-center h-full">
        <Modal
          size="5xl"
          onClose={onClose}
          isOpen={isOpen}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          onOpenChange={onOpen}
        >
          <ModalContent>
            {(onClose) => {
              return screen == 4 ? (
                <>
                  <ModalHeader className="">
                    Next New Website Account
                  </ModalHeader>
                  <ModalBody className="grid grid-cols-2 gap-4">
                    <div>
                      <Code color="warning">
                        Change the path to your cookies enviroment
                        <Input
                          type="file"
                          placeholder="Name of the website"
                          onChange={handleFileChange}
                        />
                      </Code>
                    </div>
                  </ModalBody>
                </>
              ) : cookiesSet == true ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    Cookies Set Successfully
                  </ModalHeader>
                  <ModalBody className="flex w-full h-full justify-center items-center">
                    You Have Successfully Set the Cookies Enviroment for your
                    system
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={() => onClose()}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              ) : cookiesSet === 90 ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    Can't Set Cookies Successfully On Your System
                  </ModalHeader>
                  <ModalBody className="flex w-full h-full justify-center items-center">
                    You Are Unable To Successfully Set the Cookies Enviroment
                    for your system
                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" onClick={() => onClose()}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              ) : screen == 3 ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    {" "}
                    Step 4
                  </ModalHeader>
                  <ModalBody className="grid grid-cols-2 gap-4">
                    <Input
                      type="file"
                      placeholder="Select the cookies file"
                      onChange={handleFileChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </>
              ) : screen == 9 ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    {" "}
                    Step 4
                  </ModalHeader>
                  <ModalBody className="w-full">
                    <Select
                      onSelectionChange={(value: string) => {
                        let values = new Set(value)?.entries().next()?.value[0];
                        if (!linksList?.includes(values)) {
                          setNewLinkList((e: any) => {
                            return [...(e ? e : []), values];
                          });
                        } else {
                          const index = linksList.indexOf(values);
                          linksList.slice(index, index + 1);
                          linksList.push(values);
                          const D = linksList;
                          setNewLinkList((e) => D);
                        }
                      }}
                      defaultSelectedKeys={["www.amazon.com"]}
                      placeholder="Select Your E-commerce Website"
                      description="E-commerce websites"
                    >
                      <SelectItem
                        startContent={
                          <img
                            src={"https://www.amazon.com/favicon.ico"}
                            width={"28"}
                          />
                        }
                        value={"amazon.com"}
                        key=".amazon.com"
                      >
                        Amazon
                      </SelectItem>
                      <SelectItem
                        startContent={
                          <img
                            src={"https://www.aliexpress.com/favicon.ico"}
                            width={"28"}
                          />
                        }
                        value={"www.aliexpress.com"}
                        key=".aliexpress.com"
                      >
                        AllExpress
                      </SelectItem>
                      <SelectItem
                        startContent={
                          <img src={"https://www.alibaba.com/favicon.ico"} />
                        }
                        value={"www.alibaba.com"}
                        key=".alibaba.com"
                      >
                        Alibaba
                      </SelectItem>
                      <SelectItem
                        startContent={
                          <img src={"https://www.walmart.com/favicon.ico"} />
                        }
                        value={"www.walmart.com"}
                        key=".walmart.com"
                      >
                        Walmart
                      </SelectItem>
                      <SelectItem
                        startContent={
                          <img src={"https://www.ebay.com/favicon.ico"} />
                        }
                        value={"ebay.com"}
                        key=".ebay.com"
                      >
                        Ebay
                      </SelectItem>
                    </Select>
                    {linksList &&
                      linksList.length > 0 &&
                      !Host.some((e) => {
                        console.log(e, linksList[linksList?.length - 1]);
                        return e == linksList[linksList?.length - 1];
                      }) && (
                        <div className="text-red-500">
                          <p>
                            {" "}
                            We notice you have not signed in on this account{" "}
                          </p>
                          <div className="w-full items-center flex justify-end">
                            <Button
                              isExternal
                              className="bg-blue-500 text-slate-100 w-[150px]"
                            >
                              <a
                                href={`https://${
                                  linksList
                                    ? linksList[linksList.length - 1]
                                    : ""
                                }/`}
                              >
                                Connect
                              </a>
                            </Button>
                          </div>
                        </div>
                      )}
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                  </ModalFooter>
                </>
              ) : screen === 1 ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    Step 2
                  </ModalHeader>
                  <ModalBody className="grid grid-cols-2 gap-4">
                    <label>Select your web browser</label>
                    <Select
                      onSelectionChange={setBrowser}
                      defaultSelectedKeys={["Chrome"]}
                      isDismissable={false}
                      isKeyboardDismissDisabled={true}
                    >
                      <SelectItem value={"Chrome"} key="chrome">
                        Chrome
                      </SelectItem>
                      <SelectItem value={"Edges"} key="edges">
                        Edges
                      </SelectItem>
                      <SelectItem value={"firefox"} key="firefox">
                        FireFox
                      </SelectItem>
                    </Select>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={() => setScreen(3)}>Skip</Button>
                    <Button
                      onClick={(e) => {
                        setScreen(2);
                      }}
                    >
                      Next
                    </Button>
                  </ModalFooter>
                </>
              ) : screen === 2 ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    {" "}
                    step 3
                  </ModalHeader>
                  <ModalBody className="grid grid-cols-2 gap-4">
                    <div>
                      <Code color="warning" className="m-5 mt-1 space-y-2">
                        Copy this link
                        <p className="ml-5 mt-2">
                          <Code color="warning">
                            {`C:\\Users\\%USERNAME%\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network`}
                          </Code>
                          paste it on your file explore.
                        </p>
                        <p className="m-1">
                          <Code color="warning" className="mt-2">
                            You will see cookies file, copy the cookies file
                            into another directory,
                            <p>
                              as it is currently in use, while you do this first
                              close your web browser
                              <p>
                                then, copy the file and past the cookies file to
                                another directory
                                <p>
                                  {" "}
                                  and select the cookies file, when you are back
                                  on our website
                                  <p> then select the file in the next step</p>
                                </p>
                              </p>
                            </p>
                          </Code>
                        </p>
                      </Code>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={() => setScreen(3)}>Skip</Button>
                    <Button onClick={() => setScreen(3)}>Next</Button>
                  </ModalFooter>
                </>
              ) : (
                <></>
              );
            }}
          </ModalContent>
        </Modal>

        {Cookies.length === 0 ? (
          <Code color="warning" className="mt-20">
            You don't have any website account in the dashboard.
          </Code>
        ) : (
          ""
        )}

        <ScrollShadow
          hidden={Cookies.length === 0}
          hideScrollBar
          orientation="horizontal"
          className="px-10 w-full max-w-full"
        >
          {
            <div className="w-full">
              <div className="w-full flex justify-end ">
                <div className="place-content-end  gap-10  grid grid-cols-2 lg:grid-cols-4 ">
                  <div className="w-full  items-center">
                    <h1 className="text-[12px] font-[600]">Search:</h1>
                    <div>
                      <Input
                        onChange={(e) => {
                          FilterCookies("Search", e.target.value);
                        }}
                        className="w-[250px]"
                        color="success"
                        size="sm"
                        type="search"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="font-[600] text-[12px] ">Hosts:</label>
                    <Select
                      onSelectionChange={(key) =>
                        FilterCookies(
                          "Host",
                          new Set(key).entries().next().value[0]
                        )
                      }
                      size="md"
                      className="w-[250px]"
                      color="success"
                    >
                      {(Host.length ? Host : ["No Host Found"])?.map(
                        (cookies) => {
                          return (
                            <SelectItem key={cookies} value={cookies}>
                              {cookies}
                            </SelectItem>
                          );
                        }
                      )}
                    </Select>
                  </div>

                  <div className="w-full flex flex-col ">
                    <label className="font-[600] text-[12px]">
                      Filter by date:
                    </label>
                    <Input
                      onChange={(key) =>
                        FilterCookies(
                          "Date",
                          Date.parse((key as any)?.target?.valueAsDate)
                        )
                      }
                      color="success"
                      type="date"
                      size="md"
                    />
                  </div>

                  <div className="w-full flex flex-col">
                    <label className="font-[600] text-[12px] ">
                      Filter by:
                    </label>
                    <Select
                      onSelectionChange={(key) =>
                        FilterCookies(
                          "filter",
                          new Set(key).entries().next().value[0]
                        )
                      }
                      size="md"
                      className="w-[250px]"
                      color="success"
                    >
                      {["Watch Cookies", "Search", "Date", "Host"].map(
                        (cookies) => {
                          return (
                            <SelectItem key={cookies} value={cookies}>
                              {cookies}
                            </SelectItem>
                          );
                        }
                      )}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="mt-10 py-20 rounded-md flex flex-wrap gap-4 justify-center">
                  {Cookies &&
                    linksList &&
                    Cookies?.filter((cookies) => {
                      return linksList.includes(cookies.host_key);
                    })
                      .map((cookies: Cookie, index: number) => {
                        return (
                          <CookiesAccount
                            cookie={cookies}
                            isFavorite={fav?.includes(cookies.key) ?? false}
                            keys={cookies.key}
                            filter={filter}
                            deleted={Delete}
                            selected={selected}
                            onDelete={setDelete}
                            setRenderList={setRenderedList}
                            onAddFav={setFav}
                            renderList={renderList}
                            linkModal={linkModal}
                            setLinkModal={showLinksModal}
                          />
                        );
                      })
                      .filter((element) => {
                        return element !== null && element !== undefined;
                      })
                      .slice(page * 100, page * 100 + 100)}
                </div>
                <div className="mt-10 w-full flex justify-center space-x-10">
                  <Pagination
                    total={Math.floor(totalPage / 100)}
                    onChange={setPage}
                    boundaries={2}
                    color="secondary"
                  />
                  <Button
                    onClick={fetchData}
                    className=" text-white font-[700] px-10 py-2"
                    color="secondary"
                  >
                    You have {Math.floor(totalPage / 100)} different phase
                    unsynchronized account on your web browser
                  </Button>
                </div>
              </div>
            </div>
          }
        </ScrollShadow>
      </div>
      <div className="mt-10 flex justify-center space-x-10 items-center">
        <Button
          onClick={() => {
            onOpen();
            setScreen(1);
          }}
        >
          <Add /> Set Enviroment Cookies
        </Button>
        <Button
          onClick={() => {
            onOpen();
            setScreen(9);
          }}
        >
          <Add /> Add E-commerce Website
        </Button>
      </div>
    </div>
  );
}
