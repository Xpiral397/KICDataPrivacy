import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="px-8 py-10 mt-8 text-white bg-blue-600 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-lg">Our commitment to your privacy</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto">
        <div className="px-5 py-5 mx-auto bg-white rounded-md shadow-md ">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Introduction</h2>
            <p>
              We value your privacy and are committed to protecting your
              personal information. This Privacy Policy outlines how we collect,
              use, disclose, and safeguard your data.
            </p>
          </section>

          {/* Basic Contact Information */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              Basic Contact Information
            </h2>
            <p>
              This section covers the basic details we collect, including your
              full name, email address, and phone number. We may need this
              information to communicate with you or provide our services.
            </p>
          </section>

          {/* Demographic Information */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              Demographic Information
            </h2>
            <p>
              Demographic data, such as your age, gender, and location (city,
              state, country), helps us understand our audience better and
              tailor our services to your needs.
            </p>
          </section>

          {/* Account Information */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Account Information</h2>
            <p>
              Account details like your username and password (only if
              necessary) are securely stored to facilitate your access to our
              platform and ensure the security of your account.
            </p>
          </section>

          {/* Transaction Data */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Transaction Data</h2>
            <p>
              Information related to your purchases, order details, and payment
              information (if required) is collected to process transactions and
              provide you with the products or services you've requested.
            </p>
          </section>

          {/* Preferences and Interests */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              Preferences and Interests
            </h2>
            <p>
              Your preferences, interests, and favorite categories or brands
              help us personalize your experience and deliver content that
              aligns with your preferences.
            </p>
          </section>

          {/* Communication Preferences */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              Communication Preferences
            </h2>
            <p>
              We respect your communication preferences and only send marketing
              communications via your preferred channels, such as email or SMS,
              if you opt in to receive them.
            </p>
          </section>

          {/* Social Media Information */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
              Social Media Information (if applicable)
            </h2>
            <p>
              If you choose to connect with us on social media platforms, we may
              collect information such as your social media handle and
              connections to enhance your social sharing experience.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 mt-8 text-white bg-blue-600">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Data Privacy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
