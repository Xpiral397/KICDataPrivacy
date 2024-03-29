"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

const BlogPost = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-blue-600 text-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold">
            Navigating Personal Information Security in E-commerce
          </h1>
          <p className="mt-2">Safeguarding Your Digital Identity</p>
        </div>

        {/* Introduction */}
        <div className="mt-8">
          <p className="text-lg">
            In the bustling realm of e-commerce, where transactions occur
            seamlessly across digital platforms, ensuring the security of
            personal information is paramount. From browsing products to
            completing purchases, users entrust e-commerce platforms with
            sensitive data, ranging from payment details to personal
            preferences. However, with the proliferation of cyber threats and
            data breaches, safeguarding personal information has never been more
            critical. This article explores the significance of personal
            information security in the context of e-commerce and provides
            practical strategies for protecting your digital identity.
          </p>
        </div>

        {/* Subsections */}
        {/* Example Subsection */}
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">Understanding the Risks</h2>
          <p>
            At the heart of personal information security lies the principle of
            confidentiality – ensuring that sensitive data remains private and
            inaccessible to unauthorized parties. When engaging in e-commerce
            activities, users divulge a myriad of personal details, including
            names, addresses, payment card information, and browsing habits.
            Therefore, it is essential to entrust this information to reputable
            e-commerce platforms that prioritize data protection and employ
            robust security measures.
          </p>
          <h2 className="font-bold text-xl mb-4 mt-10">
            Security Measur & Data Encryption
          </h2>
          <p>
            security measures. One of the primary security measures implemented
            by e-commerce platforms is encryption, which encodes data
            transmitted between users' devices and the platform's servers.
            Encryption protocols such as SSL (Secure Sockets Layer) and TLS
            (Transport Layer Security) ensure that sensitive information remains
            encrypted during transmission, thwarting interception by malicious
            actors. As such, always verify that the e-commerce website you're
            accessing utilizes HTTPS (Hypertext Transfer Protocol Secure)
            encryption, as indicated by the padlock icon and "https://" prefix
            in the website's URL. In addition to encryption, users play a
            pivotal role in personal information security by adopting proactive
            security practices and exercising caution when sharing sensitive
            data online. Avoid storing payment card details on e-commerce
            platforms unless necessary, and opt for secure payment methods such
            as credit cards with fraud protection or digital wallets.
            Furthermore, create strong, unique passwords for e-commerce accounts
            and enable multi-factor authentication whenever possible to add an
            extra layer of security.
          </p>
        </div>

        {/* Practical Tips */}
        <div className="mt-8">
          <h2 className="font-bold text-xl mb-4">
            Proactive Security Practices
          </h2>
          <div className="rounded-lg bg-zinc-50 py-2 px-3 border ">
            <Accordion
              motionProps={{
                variants: {
                  enter: {
                    y: 0,
                    opacity: 1,
                    height: "auto",
                    transition: {
                      height: {
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 1,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 1,
                      },
                    },
                  },
                  exit: {
                    y: -10,
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        easings: "ease",
                        duration: 0.25,
                      },
                      opacity: {
                        easings: "ease",
                        duration: 0.3,
                      },
                    },
                  },
                },
              }}
              className="border bg-white rounded-lg"
            >
              <AccordionItem
                key="1"
                aria-label="Password Updates"
                title="Password Updates"
                classNames={{
                  title: "font-[500] font-[sans-serif]",
                }}
              >
                Over time, passwords can be compromised without your knowledge,
                especially if they are reused across multiple sites. Regular
                updates minimize the window of opportunity for a hacker to use
                stolen credentials. Furthermore, in the event of a data breach,
                having a recently changed password can prevent unauthorized
                access to your account.
              </AccordionItem>
              <AccordionItem
                classNames={{
                  title: "font-[500] font-[sans-serif]",
                }}
                key="2"
                aria-label="Accordion 2"
                title="2 Step Authentication"
              >
                MFA adds an additional layer of security beyond just the
                password. Even if a hacker manages to obtain your password, they
                would still need the second factor—usually something you have
                (like a phone to receive a verification code) or something you
                are (like a fingerprint)—to access your account.
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Accordion 3"
                title="Why It's Important"
                classNames={{
                  title: "font-[500] font-[sans-serif]",
                }}
              >
                Updating passwords regularly and using multi-factor
                authentication (MFA) are key practices in securing your online
                accounts, including those on e-commerce platforms.
              </AccordionItem>
            </Accordion>

            <ul className="list-disc pl-8 space-y-2">
              <li>
                Regularly update your passwords and use multi-factor
                authentication.
              </li>
              <li>
                Verify the security of e-commerce platforms before making
                purchases.
              </li>
              {/* More tips */}
            </ul>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-8">
          <h2 className="font-bold text-xl">Conclusion</h2>
          <p>
            In conclusion, personal information security is paramount in
            e-commerce, where users entrust sensitive data to online platforms
            for various transactions. By understanding the importance of data
            confidentiality, adopting proactive security practices, and
            remaining vigilant against cyber threats, users can protect their
            digital identity and enjoy safe and secure e-commerce experiences.
            Remember, prioritizing personal information security is key to
            maintaining trust and confidence in the digital marketplace.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
