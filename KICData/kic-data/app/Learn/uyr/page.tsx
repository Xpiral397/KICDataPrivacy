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
          <h1 className="text-3xl font-bold">Know Your Rights:</h1>
          <p className="mt-2">Empowering Consumers in E-commerce</p>
        </div>

        {/* Introduction */}
        <div className="mt-8">
          <p className="text-lg">
          In the rapidly evolving world of e-commerce, where transactions occur at the speed of a click, understanding your rights as a consumer is paramount. From privacy protections to refund policies, knowing your rights empowers you to make informed decisions, assert your interests, and navigate the digital marketplace with confidence. This article aims to shed light on the rights of consumers in the context of e-commerce and provide actionable insights to help you exercise and protect those rights.

          </p>
        </div>


        <ul className=" text-slate-900] font-[400] mt-3 mx-5 space-y-2 font-[Roboto, sans-serif, Helvetica]">
            
            <li className="font-[400]">
              <span className="font-[700]">Right to Privacy</span>: : As a consumer engaging in e-commerce activities, you have the right to privacy and data protection. E-commerce platforms are required to collect, use, and safeguard your personal information in accordance with privacy laws and regulations. This includes obtaining your consent before collecting your data, providing clear and transparent privacy policies, and implementing robust security measures to protect your information from unauthorized access or disclosure
            </li>

            <li>
              <span className="font-[700]">Right to Transparency</span>:: E-commerce platforms are obligated to provide clear and accurate information about their products, services, pricing, and terms of use. This includes disclosing any fees, taxes, or additional charges upfront, as well as outlining the terms and conditions governing your interactions with the platform. Transparency ensures that consumers can make informed decisions and understand the implications of their actions in the e-commerce ecosystem

            </li>


            <li>
              <span className="font-[800]">Right to Fair Treatment</span>: You have the right to fair and equitable treatment when engaging with e-commerce platforms. This includes access to customer support and assistance in resolving disputes or issues with products or services. E-commerce platforms should provide timely and effective responses to customer inquiries and complaints, ensuring that consumers receive adequate support throughout their shopping experience.
           </li>
            <li>
              <span className="font-[800]">Right to Security</span>:: E-commerce platforms are responsible for maintaining the security of their systems and protecting consumers' personal and financial information from cyber threats and data breaches. This includes implementing encryption protocols, secure payment gateways, and authentication measures to safeguard sensitive data. Consumers have the right to expect that their information will be handled securely and that appropriate measures will be taken to prevent unauthorized access or misuse.
              </li>
            
               <li>
               <span className="font-[800]">Right to Redress</span>: 
               :If you encounter problems or dissatisfaction with a product or service purchased through an e-commerce platform, you have the right to seek redress and remedies. This may include requesting refunds, exchanges, or compensation for defective or misrepresented items. E-commerce platforms should have clear and accessible refund and return policies that outline your rights and options in such situations.
               </li> 
               <li>
               <span className="font-[800]">Right to Opt-Out</span>: 
               : You have the right to control how your personal information is used and shared by e-commerce platforms. This includes the ability to opt out of marketing communications, data-sharing practices, and targeted advertising. E-commerce platforms should provide mechanisms for users to exercise their privacy preferences and manage their consent settings easily.
               </li>
        </ul>

        {/* Subsections */}
        {/* Example Subsection */}
        

        {/* Conclusion */}
        <div className="mt-8">
          <h2 className="font-bold text-xl">Conclusion</h2>
          <p>
          In conclusion, understanding your rights as a consumer in e-commerce is essential for protecting your interests, privacy, and security in the digital marketplace. By knowing your rights, you can make informed decisions, hold e-commerce platforms accountable, and advocate for fair treatment and transparency. Remember, your rights as a consumer empower you to navigate the e-commerce landscape confidently and assert your interests in an increasingly digital world.
</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
