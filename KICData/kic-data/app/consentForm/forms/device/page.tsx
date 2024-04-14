import React from "react";

const DeviceInformationPage = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="px-8 py-10 mt-8 text-white bg-blue-600 rounded-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Device Information</h1>
          <p className="text-lg">How We Handle Device Data</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto">
        <div className="px-5 py-5 mx-auto bg-white rounded-md shadow-md">
          {/* Introduction */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">Introduction</h2>
            <p>
              This section outlines how we collect, use, and protect device
              information when you interact with our platform.
            </p>
          </section>

          {/* Data Collection */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Collection</h2>
            <p>
              We may collect device information such as IP address, browser
              type, device model, and operating system to analyze usage
              patterns, troubleshoot issues, and improve our services.
            </p>
          </section>

          {/* Data Usage */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Usage</h2>
            <p>
              Device data is used to customize your experience, ensure
              compatibility, and optimize performance across different devices
              and platforms. We do not use device information for targeted
              advertising or profiling purposes.
            </p>
          </section>

          {/* Data Protection */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Protection</h2>
            <p>
              We employ robust security measures to protect device information
              from unauthorized access, disclosure, alteration, or destruction.
              Your device data is treated with the same level of confidentiality
              and care as other personal information.
            </p>
          </section>

          {/* Data Retention */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Data Retention</h2>
            <p>
              Device information is retained only for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy or as
              required by law. We regularly review and update our data retention
              practices to ensure compliance with applicable regulations.
            </p>
          </section>

          {/* User Rights */}
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">Your Rights</h2>
            <p>
              You have the right to control the collection and processing of
              your device data. You can adjust your device settings or opt out
              of certain data collection practices where applicable. Please
              refer to our Privacy Policy for more information on your rights
              and how to exercise them.
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

export default DeviceInformationPage;
