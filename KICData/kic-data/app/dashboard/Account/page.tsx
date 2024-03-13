"use client";
import React, { useState } from "react";
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
} from "@nextui-org/react";
import { Add } from "@mui/icons-material";
import { getIconUrl } from "@/components/getIcons"; // Ensure this function is correctly implemented.
import { link } from "fs";

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

export default function Accounts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [webLinks, setWebLinks] = useState<LinkWebsite[]>([]);
  const [selected, setSelected] = useState<string>("All");
  const [webLink, setWebLink] = useState("");
  const [webName, setWebName] = useState("");
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

  const handleAddWebsite = () => {
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
        <Modal isOpen={isOpen} onOpenChange={onOpen}>
          <ModalContent>
            {(onClose) => {
              return (
                <>
                  <ModalHeader>Add New Website Account</ModalHeader>
                  <ModalBody className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Code className="sm" color="danger">
                        {error.name}{" "}
                      </Code>
                      <Input
                        placeholder="Name of the website"
                        value={webName}
                        onChange={(e) => setWebName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Code className="text-sm" color="danger">
                        {error.link}{" "}
                      </Code>
                      <Input
                        placeholder="Website Link"
                        value={webLink}
                        onChange={(e) => setWebLink(e.target.value)}
                      />{" "}
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
                    <Button onClick={handleAddWebsite}>Add</Button>
                  </ModalFooter>
                </>
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
      <div className="mt-10 flex justify-center items-center">
        <Button onClick={() => onOpen()}>
          <Add /> Add Website Account
        </Button>
      </div>
    </div>
  );
}
