"use client";
import { SingleSidebarBoardLayout } from "@/components/sidebar";
import { ReactNode, useEffect, useState, useContext } from "react";
import Navbar from "../dashboard/navbar";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { isSigIn } from "../helpers/authenticate";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Progress,
  Spinner,
  Tab,
  Tabs,
  useDisclosure,
} from "@nextui-org/react";
import { get } from "https";

export function clearConsent() {
  return localStorage.removeItem("consent");
}

export default function SidebarBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = useSession();
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [accepted, setAccepted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function getConsent() {
    return JSON.parse(
      localStorage.getItem("consent") ?? ""
        ? localStorage.getItem("consent") ?? "false"
        : "false"
    );
  }
  function addConsent() {
    localStorage.setItem("consent", "true");
  }

  useEffect(() => {
    setLoading(true);
    if (accepted || getConsent()) {
      router.push("/Learn");
      setLoading(false);
      onClose();
      router.refresh();
    } else if (session.status === "unauthenticated") {
      console.log(session);
      if (getConsent()) {
        clearConsent();
      }
      router.push("/auth/login");
      setLoading(false);
    } else if (session.status == "authenticated") {
      (async () => {
        const response = await isSigIn((session.data.user as any).refreshToken);
        if (response && getConsent()) {
          router.push("/Learn");
          setLoading(false);
        } else if (response && !getConsent()) {
          onOpen();
        } else {
          signOut();
          setLoading(false);
        }
      })();
    }
  }, [accepted, session.status]);
  if (session.status === "authenticated") {
    return (
      <div className="flex flex-col h-full">
        <div className="w-full">
          <Navbar />
        </div>
        <div className="flex items-center justify-center w-full h-full place-items-center">
          <main className="w-full h-full">
            {
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={() => {
                  if (!accepted) {
                    signOut();
                    router.push("/auth/login");
                  }
                }}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                size="4xl"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Modal Title
                      </ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col w-full">
                          <Tabs aria-label="Options">
                            <Tab
                              key="Basic Contact Information"
                              title="Basic Contact Information:"
                            >
                              <Card>
                                <CardBody className="text-[monospace] overflow-scroll max-h-[50vh] max-w-md mx-auto bg-white rounded-xl shadow-md  md:max-w-2xl">
                                  Do you consent to us sharing the following
                                  information to second-party sites?
                                  <div className="max-w-md">
                                    <ul className="divide-y divide-gray-200">
                                      <li className="py-4">
                                        <h3 className="text-lg font-semibold">
                                          Basic Contact Information:
                                        </h3>
                                        <ul className="mt-2">
                                          <li>Full Name</li>
                                          <li>Email Address</li>
                                          <li>Phone Number</li>
                                        </ul>
                                      </li>

                                      <li className="py-4">
                                        <h3 className="text-lg font-semibold">
                                          Demographic Information:
                                        </h3>
                                        <ul className="mt-2">
                                          <li>Age</li>
                                          <li>Gender</li>
                                          <li>
                                            Location (City, State, Country)
                                          </li>
                                        </ul>
                                      </li>

                                      <li className="py-4">
                                        <h3 className="text-lg font-semibold">
                                          Account Information:
                                        </h3>
                                        <ul className="mt-2">
                                          <li>Username</li>
                                          <li>
                                            Password (only if necessary for
                                            authentication on the second-party
                                            site)
                                          </li>
                                        </ul>
                                      </li>

                                      <li className="py-4">
                                        <h3 className="text-lg font-semibold">
                                          Transaction Data:
                                        </h3>
                                        <ul className="mt-2">
                                          <li>Purchase history</li>
                                          <li>Order details</li>
                                          <li>
                                            Payment information (only if
                                            necessary for transactions on the
                                            second-party site)
                                          </li>
                                        </ul>
                                      </li>

                                      <li className="py-4">
                                        <h3 className="text-lg font-semibold">
                                          Preferences and Interests:
                                        </h3>
                                        <ul className="mt-2">
                                          <li>Product preferences</li>
                                          <li>Interests or hobbies</li>
                                          <li>Favorite categories or brands</li>
                                        </ul>
                                      </li>
                                      <li className="py-4">
                                        <h3 className="text-lg font-semibold">
                                          Communication Preferences:
                                        </h3>
                                        <ul className="mt-2">
                                          <li>
                                            Opt-in preferences for marketing
                                            communications
                                          </li>
                                          <li>
                                            Preferred communication channels
                                            (e.g., email, SMS)
                                          </li>
                                        </ul>
                                      </li>
                                      <li className="py-4">
                                        <h3 className="text-lg font-semibold">
                                          Social Media Information (if
                                          applicable):
                                        </h3>
                                        <ul className="mt-2">
                                          <li>Social media handle</li>
                                          <li>
                                            Connections or friends list (if
                                            relevant for social sharing
                                            features)
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </CardBody>
                              </Card>
                            </Tab>
                            <Tab key="Device Info" title="Device Information:">
                              <Card>
                                <CardBody className="overflow-scroll max-h-[50vh] max-w-md mx-auto bg-white rounded-xl shadow-md md:max-w-2xl">
                                  <div>
                                    <div className="">
                                      <ul className="divide-y divide-gray-200">
                                        <li>
                                          <h3 className="text-lg font-semibold">
                                            Device Information:
                                          </h3>
                                          <ul className="mt-2">
                                            <li>
                                              Device type (e.g., mobile,
                                              desktop)
                                            </li>
                                            <li>Browser type and version</li>
                                          </ul>
                                        </li>

                                        <li>
                                          <h3 className="text-lg font-semibold">
                                            Behavioral Data:
                                          </h3>
                                          <ul className="mt-2">
                                            <li>Browsing history</li>
                                            <li>Clickstream data</li>
                                            <li>
                                              Interaction with advertisements or
                                              promotions
                                            </li>
                                          </ul>
                                        </li>

                                        <li>
                                          <h3 className="text-lg font-semibold">
                                            Third-Party Integrations:
                                          </h3>
                                          <ul className="mt-2">
                                            <li>
                                              Information shared with
                                              third-party services or platforms
                                              integrated with the second-party
                                              site (e.g., social media plugins,
                                              analytics tools)
                                            </li>
                                          </ul>
                                        </li>

                                        <li>
                                          <h3 className="text-lg font-semibold">
                                            Feedback and Reviews:
                                          </h3>
                                          <ul className="mt-2">
                                            <li>
                                              Product reviews or feedback
                                              submitted on the second-party site
                                            </li>
                                          </ul>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </CardBody>
                              </Card>
                            </Tab>
                            <Tab key="data" title="How Your Data Will be Used">
                              <Card>
                                <CardBody>
                                  We believe in fostering collaborative
                                  partnerships to enrich your experience. By
                                  sharing select user information with our
                                  trusted second-party site, we aim to
                                  personalize your journey, tailor
                                  recommendations, and streamline transactions,
                                  ensuring a seamless and rewarding interaction
                                  tailored to your preferences and needs."
                                </CardBody>
                              </Card>
                            </Tab>
                          </Tabs>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={() => {
                            onClose();
                            signOut();
                          }}
                        >
                          Reject Policy
                        </Button>
                        <Button
                          color="primary"
                          onPress={() => {
                            setAccepted(true);
                            addConsent();
                          }}
                        >
                          Accept Policy
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            }
            {children}
          </main>
        </div>
      </div>
    );
  } else if (loading) {
    <div className="flex items-center justify-center w-full h-full">
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="max-w-md"
      />
    </div>;
  }
  return (
    <div className="flex items-center justify-center top-0 right-0 absolute w-full h-full z-[1000]">
      <div className="bg-white shadow-2xl shadow-blue-900   rounded-md w-full  max-w-[450px] sm:w-[500px] flex space-x-5 items-center place-items-center justify-center h-[300px]">
        <Spinner color="secondary" />
        <h1 className="text-purple-800 font-[600]">Processing...</h1>
      </div>
    </div>
  );
}
