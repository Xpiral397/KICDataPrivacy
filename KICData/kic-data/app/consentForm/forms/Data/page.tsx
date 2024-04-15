import React from "react";

const PersonalInformationPage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="px-8 py-10 mt-8 text-white bg-blue-600 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Personal Information</h1>
          <p className="text-lg">How We Handle Your Personal Data</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto">
        <div className="px-5 py-5 mx-auto bg-white rounded-md shadow-md ">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Introduction</h2>
            <p>
              This section outlines how we handle your personal information and
              the measures we take to protect your privacy.
            </p>
          </section>

          {/* Data Collection */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Collection</h2>
            <p>
              We collect personal data such as your name, email address, and
              phone number when you interact with our platform. This information
              is necessary for providing our services and enhancing your user
              experience.
            </p>
          </section>

          {/* Data Usage */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Usage</h2>
            <p>
              Your personal data is used for various purposes, including user
              authentication, communication, and service improvements. We
              prioritize data security and confidentiality in all our
              operations.
            </p>
          </section>

          {/* Data Protection */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Protection</h2>
            <p>
              We implement industry-standard security measures to safeguard your
              personal information against unauthorized access, disclosure,
              alteration, or destruction. Our data protection practices comply
              with applicable laws and regulations.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy or as
              required by law. When no longer needed, we securely dispose of or
              anonymize your information.
            </p>
          </section>

          {/* User Rights */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal
              information stored in our systems. You can also request
              information about the processing of your data and exercise your
              data protection rights under applicable laws.
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

export default PersonalInformationPage;
