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
} from "@nextui-org/react";

import { getIconUrl } from "@/components/getIcons"; // Ensure this function is correctly implemented.
import { link } from "fs";
import { Add } from "@mui/icons-material";
import { postData } from "@/app/helpers/XXRSAgent/setCookies";

export interface LinkWebsite {
  link: string;
  name: string;
  connected: string;
}

const WebsiteLink = ({ websiteLink }: { websiteLink: LinkWebsite }) => {
  return (
    <div className="relative flex flex-col items-center w-[200px] h-[200px] rounded-md bg-blue-100">
      <div className="absolute right-0">
        {websiteLink.connected == "Disconnected" ? (
          <Code color="danger">Disconnected</Code>
        ) : (
          <Code color="success">Connected</Code>
        )}
      </div>
      <div className="flex flex-col mt-20 space-y-5 items-center h-full ">
        <Image
          className="w-full h-full"
          alt="favicon"
          src={getIconUrl(websiteLink.link)} // Ensure this function returns a valid image URL.
        />
        <h1 className="text-slate-800 font-semibold">{websiteLink.name}</h1>
      </div>
    </div>
  );
};
type Computer = "Mac" | "Window" | undefined;
type Browser = "Chrome" | "Edges" | "FireFox" | undefined;
interface CookiesSelectionInfo {
  AppDataRoot: string;
  computer: Computer;
  browser: Browser;
  cookies: File | "";
}
export default function Accounts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [webLinks, setWebLinks] = useState<LinkWebsite[]>([]);
  const [selected, setSelected] = useState<string>("All");
  const [webLink, setWebLink] = useState("");
  const [cookieFile, setCookieFile] = useState<File | "">();
  const [webName, setWebName] = useState("");
  const [cookiesSet, cookiesSetSuccessfully] = useState<boolean | null>(null);
  const [cookiesInfo, setCookiesInfo] = useState<CookiesSelectionInfo>({
    AppDataRoot: "",
    computer: "Mac",
    browser: "Chrome",
    cookies: "",
  });
  const [screen, setScreen] = useState<number>(0);

  const [browser, setBrowser] = useState<Browser>("Chrome");
  const [connected, setConnected] = useState<string>("Disconnected");
  const [error, setError] = useState({
    name: "",
    link: "",
  });
  const isValidUrl = (str: string): boolean => {
    try {
      new URL(str);
      return true;
    } catch (err) {
      return false;
    }
  };
  useEffect(() => {
    cookiesSetSuccessfully(null);
    const process = new FormData();
    process.append("file", cookiesInfo.cookies);
    postData("xpiral397@gmail.com", process).then((code) => {
      if (code == 200) {
        cookiesSetSuccessfully(true);
      } else {
        cookiesSetSuccessfully(false);
      }
    });
  }, [isOpen]);
  // useEffect(() => {
  //   if (!(screen1 && screen2 && screen3 && done)) {
  //     setScreen1(true);
  //   } else if (screen1 && !(screen2 && screen3 && done)) {
  //     setScreen2(true);
  //     setScreen1(false);
  //   } else if (screen2 && !(screen1 && screen3 && done)) {
  //     setScreen2(false);
  //     setScreen3(true);
  //   } else if (screen3 && !(screen2 && screen3 && done)) {
  //     setScreen3(false);
  //     setDone(true);
  //   }
  // }, []);
  const handleChange = (num: number) => {
    setScreen(num);
  };

  const handleNextWebsite = () => {
    if (webLink && webName && isValidUrl(webLink)) {
      const newLink: LinkWebsite = {
        link: webLink,
        name: webName,
        connected: connected,
      };

      setWebLinks((currentLinks) => [...currentLinks, newLink]);
      onClose();
      setWebLink("");
      setWebName("");
      setConnected("Disconnected");
    } else {
      setError((e) => ({
        ...e,
        name: e.name.length > 0 ? "" : "This field is required",
        link: isValidUrl(e.link) ? "" : "Please enter valid url",
      }));
    }
  };

  return (
    <div className="w-full">
      <div className="bg-teal-50 mt-1 rounded-md w-full flex items-center justify-center">
        <Tabs
          color="secondary"
          aria-label="Tabs colors"
          radius="full"
          onSelectionChange={setSelected}
          selectedKey={selected}
        >
          <Tab key="All" title="All" />
          <Tab key="connected" title="Connected" />
          <Tab key="Disconnected" title="Disconnected" />
        </Tabs>
      </div>
      <div className="bg-teal-50 flex flex-col justify-center items-center h-full">
        <Modal
          size="5xl"
          onClose={onClose}
          isOpen={isOpen}
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
                          value={cookiesInfo.cookies}
                          placeholder="Name of the website"
                          onChange={(event) =>
                            setCookiesInfo((e2: any) => {
                              return {
                                ...e2,
                                cookies:
                                  (event.target.files &&
                                    event.target.files.length &&
                                    event.target.files[0]) ??
                                  "",
                              };
                            })
                          }
                        />
                      </Code>
                    </div>

                    <div className="space-y-2">
                      {error.name && (
                        <Code className="sm" color="danger">
                          {error.name}
                        </Code>
                      )}
                      <Input
                        placeholder="Name of the website"
                        value={webName}
                        onChange={(e) => setWebName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      {error.link && (
                        <Code className="text-sm" color="danger">
                          {error.link}
                        </Code>
                      )}
                      <Input
                        placeholder="Website Link"
                        value={webLink}
                        onChange={(e) => setWebLink(e.target.value)}
                      />
                    </div>
                    <Select
                      onSelectionChange={setConnected}
                      defaultSelectedKeys={["Disconnected"]}
                    >
                      <SelectItem value={"Connected"} key="Connected">
                        Connected
                      </SelectItem>
                      <SelectItem value={"Disconnected"} key="Disconnected">
                        Disconnected
                      </SelectItem>
                    </Select>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={handleNextWebsite}>Next</Button>
                  </ModalFooter>
                </>
              ) : screen == 0 ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    {" "}
                    Step 1
                  </ModalHeader>
                  <ModalBody className="flex w-full h-full justify-center items-center">
                    <Input
                      type="name"
                      placeholder="Enter your computer username"
                      onChange={(e) =>
                        setCookiesInfo((e2) => {
                          return { ...e2, AppDataRoot: e.target.value ?? "" };
                        })
                      }
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={() => onClose()}>Close</Button>
                    <Button onClick={() => setScreen(2)}>Skip</Button>

                    <Button onClick={() => setScreen(1)}>Next</Button>
                  </ModalFooter>
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
              ) : cookiesSet === "333" ? (
                <>
                  <ModalHeader className="bg-ble-600 text-white font-[600] text-2xl">
                    Can't Set Cookies Successfully On Your System
                  </ModalHeader>
                  <ModalBody className="flex w-full h-full justify-center items-center">
                    You Have Are Unable To Successfully Set the Cookies
                    Enviroment for your system
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
                      onChange={(event) =>
                        setCookiesInfo((e2: any) => {
                          return {
                            ...e2,
                            AppDataRoot:
                              (event.target.files &&
                                event.target.files.length &&
                                event.target.files[0]) ??
                              "",
                          };
                        })
                      }
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                    <Button onClick={() => setScreen(4)}>Skip</Button>

                    <Button
                      onClick={() => {
                        setScreen(4);
                        cookiesSetSuccessfully(null);
                        const process = new FormData();
                        process.append("file", cookiesInfo.cookies);
                        alert("HI");
                        postData("xpiral397@gmail.com", process).then(
                          (code) => {
                            if (code == 200) {
                              cookiesSetSuccessfully(true);
                            } else {
                              cookiesSetSuccessfully(false);
                            }
                          }
                        );
                      }}
                    >
                      Set as as enviroment Cookies
                    </Button>
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
                      <Code color="warning" className="space-y-10">
                        Copy this link Go to{" "}
                        <p>
                          <Code color="warning">
                            {`C:\\Users\\${cookiesInfo.AppDataRoot}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network`}
                          </Code>
                          and select the cookies file
                        </p>
                        <p>
                          <Code color="warning">
                            Copy the cookies file into another directory, as it
                            is currently in use, while you do this first close
                            your we browser then , copy the file
                            <p>
                              <Code color="warning">
                                {`C:\\Users\\${cookiesInfo.AppDataRoot}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network\\cookies`}
                              </Code>
                              which can be foun at{" "}
                              <Code color="warning">
                                {`C:\\Users\\${cookiesInfo.AppDataRoot}\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Network`}
                              </Code>
                            </p>{" "}
                            and past the cookies file it to another directory
                            and select the cookies, when you are on the website.
                            then select the file in the next step
                          </Code>
                        </p>
                      </Code>
                    </div>
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
                    <Button onClick={() => setScreen(3)}>Next</Button>
                  </ModalFooter>
                </>
              ) : (
                <></>
              );
            }}
          </ModalContent>
        </Modal>

        {webLinks.length === 0 ? (
          <Code color="warning" className="mt-20">
            You don't have any website account in the dashboard.
          </Code>
        ) : (
          ""
        )}

        <>
          {
            <div className="mt-10 py-20 rounded-md flex flex-wrap gap-4 justify-center">
              {webLinks
                .filter((link) =>
                  selected === "All"
                    ? true
                    : selected === link.connected
                    ? true
                    : selected == link.connected
                )
                .map((link, index) => (
                  <WebsiteLink key={index} websiteLink={link} />
                ))}
            </div>
          }
        </>
      </div>
      <div className="mt-10 flex justify-center space-x-10 items-center">
        <Button
          onClick={() => {
            onOpen();
            setScreen(0);
          }}
        >
          <Add /> Set Enviroment Cookies
        </Button>
        <Button
          onClick={() => {
            onOpen();
            setScreen(4);
          }}
        >
          <Add /> Next Website Account
        </Button>
      </div>
    </div>
  );
}
