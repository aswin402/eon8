export interface PolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PolicyData {
  slug: string;
  metaTitle: string;
  metaDesc: string;
  title: string;
  subtitle?: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export const policyPagesData: Record<string, PolicyData> = {
  "privacy-policy-2": {
    "slug": "privacy-policy-2",
    "title": "Privacy Policy",
    "metaTitle": "Privacy Policy for Data Protection and User Security | Eon8",
    "metaDesc": "At EON8, accessible from https://www.eon8.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of",
    "lastUpdated": "October 2026",
    "sections": [
      {
        "heading": "Privacy Policy for EON8",
        "paragraphs": [
          "At EON8, accessible from https://www.eon8.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EON8 and how we use it.",
          "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
          "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EON8. This policy is not applicable to any information collected offline or via channels other than this website."
        ]
      },
      {
        "heading": "Consent",
        "paragraphs": [
          "By using our website, you hereby consent to our Privacy Policy and agree to its terms."
        ]
      },
      {
        "heading": "Information we collect",
        "paragraphs": [
          "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
          "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
          "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number."
        ]
      },
      {
        "heading": "How we use your information",
        "paragraphs": [
          "We use the information we collect in various ways, including to:",
          "• Provide, operate, and maintain our website",
          "• Improve, personalize, and expand our website",
          "• Understand and analyze how you use our website",
          "• Develop new products, services, features, and functionality",
          "• Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
          "• Send you emails",
          "• Find and prevent fraud"
        ]
      },
      {
        "heading": "Log Files",
        "paragraphs": [
          "EON8 follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information."
        ]
      },
      {
        "heading": "Cookies and Web Beacons",
        "paragraphs": [
          "Like any other website, EON8 uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.",
          "For more general information on cookies, please read “What Are Cookies”."
        ]
      },
      {
        "heading": "Google DoubleClick DART Cookie",
        "paragraphs": [
          "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads"
        ]
      },
      {
        "heading": "Advertising Partners Privacy Policies",
        "paragraphs": [
          "You may consult this list to find the Privacy Policy for each of the advertising partners of EON8.",
          "Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on EON8, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.",
          "Note that EON8 has no access to or control over these cookies that are used by third-party advertisers."
        ]
      },
      {
        "heading": "Third Party Privacy Policies",
        "paragraphs": [
          "EON8’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.",
          "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites."
        ]
      },
      {
        "heading": "CCPA Privacy Rights (Do Not Sell My Personal Information)",
        "paragraphs": [
          "Under the CCPA, among other rights, California consumers have the right to:",
          "Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
          "Request that a business delete any personal data about the consumer that a business has collected.",
          "Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.",
          "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
        ]
      },
      {
        "heading": "GDPR Data Protection Rights",
        "paragraphs": [
          "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
          "The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.",
          "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",
          "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
          "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",
          "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",
          "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",
          "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
        ]
      },
      {
        "heading": "Children’s Information",
        "paragraphs": [
          "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
          "EON8 does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
          "Communications We may contact you via e-mail or phone number that you’ve registered with EON8. For some of the clients like you, system-generated e-mails such as confirmations can be received for the proper admin operation. For any kind of communication, please write us to support@eonsofttech.in",
          "PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY USING THE WEBSITE, YOU DIRECTLY INDICATE THAT YOU AGREE, AND UNDERSTAND THE POLICY STATEMENTS. IF YOU DO NOT AGREE WITH THIS PRIVACY POLICY, DON’T MAKE USE OF THIS WEBSITE."
        ]
      }
    ]
  },
  "terms-and-conditions": {
    "slug": "terms-and-conditions",
    "title": "Terms And Conditions",
    "metaTitle": "Terms and Conditions for Website Usage and Services | Eon8",
    "metaDesc": "Please read these Terms and Conditions (“Terms”, “Terms and Conditions”) carefully before using",
    "lastUpdated": "October 2026",
    "sections": [
      {
        "heading": "Terms And Conditions",
        "paragraphs": [
          "Please read these Terms and Conditions (“Terms”, “Terms and Conditions”) carefully before using",
          "Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.",
          "By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This Terms and Conditions agreement for EON8 is generated by TermsFeed."
        ]
      },
      {
        "heading": "Accounts",
        "paragraphs": [
          "When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.",
          "You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.",
          "You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account."
        ]
      },
      {
        "heading": "Links To Other Web Sites",
        "paragraphs": [
          "Our Service may contain links to third-party web sites or services that are not owned or controlled by EON8.",
          "EON8 has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that EON8 shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.",
          "We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit."
        ]
      },
      {
        "heading": "Termination",
        "paragraphs": [
          "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
          "All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.",
          "We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.",
          "Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service."
        ]
      },
      {
        "heading": "Dismissal Without Prejudice To Any Other Rights",
        "paragraphs": [
          "EON8 can terminate this EULA in case of infringement of any term or condition referred to in the EULA by you. In that event, the Licensee accepts to return to Licensor or demolish all documents and information related to the Software or Application upon the dismissal of the License."
        ]
      },
      {
        "heading": "Refund Policy",
        "paragraphs": [
          "Our applications are designed to meet the requirements as specified by our client. Once the purchase has been made, EON8 is solely exempted and will not be held responsible for the challenges faced by our client such as not meeting server requirements and delay in learning curve concerning the functionality of the application.",
          "EON8 is not liable for any such challenges, and requesting a refund for any issues that are not per our agreement with the client will be deemed invalid, and therefore we retain all rights to deny the refund request from our client. We also do not provide a refund for installation charges or any other non-labor related charge.",
          "That being said, support will be made available to our clients. Our representatives will be more than happy to help our clients with all the queries and provide suggestions to overcome the challenges faced and will work towards the success of our clients and to their much satisfaction."
        ]
      },
      {
        "heading": "Governing Law",
        "paragraphs": [
          "These Terms shall be governed and construed in accordance with the laws of Tamil Nadu, India, without regard to its conflict of law provisions.",
          "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service."
        ]
      },
      {
        "heading": "Change",
        "paragraphs": [
          "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.",
          "By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service."
        ]
      },
      {
        "heading": "Contact Information",
        "paragraphs": [
          "If you have any questions about this EULA or wish to contact EON8 for any reason, please contact EON8 at: eon8.com OR Email: support@eonsofttech.in"
        ]
      }
    ]
  },
  "refund-policy": {
    "slug": "refund-policy",
    "title": "Refund Policy",
    "metaTitle": "Refund Policy Guidelines for Services and Payments | Eon8",
    "metaDesc": "Our applications are designed to meet the requirements as specified by our client. Once the purchase has been made, EON8 is solely exempted and will not be",
    "lastUpdated": "October 2026",
    "sections": [
      {
        "heading": "Refund Policy",
        "paragraphs": [
          "Our applications are designed to meet the requirements as specified by our client. Once the purchase has been made, EON8 is solely exempted and will not be held responsible for the challenges faced by our client such as not meeting server requirements and delay in learning curve concerning the functionality of the application.",
          "EON8 is not liable for any such challenges, and requesting a refund for any issues that are not per our agreement with the client will be deemed invalid, and therefore we retain all rights to deny the refund request from our client. We also do not provide a refund for installation charges or any other non-labor related charge.",
          "That being said, support will be made available to our clients. Our representatives will be more than happy to help our clients with all the queries and provide suggestions to overcome the challenges faced and will work towards the success of our clients and to their much satisfaction."
        ]
      },
      {
        "heading": "Contact Information",
        "paragraphs": [
          "If you have any questions about this EULA or wish to contact EON8 for any reason, please contact EON8 at: eon8 OR Email: support@eonsofttech.in"
        ]
      }
    ]
  },
  "delivery-policy": {
    "slug": "delivery-policy",
    "title": "Delivery Policy",
    "metaTitle": "Delivery Policy Details and Service Terms Guide | Eon8",
    "metaDesc": "The delivery policy is committed to delivering the promised Digital marketing services as per the best quality package chosen by the client. EON8 is aimed at",
    "lastUpdated": "October 2026",
    "sections": [
      {
        "heading": "Delivery Policy",
        "paragraphs": [
          "The delivery policy is committed to delivering the promised Digital marketing services as per the best quality package chosen by the client. EON8 is aimed at delivering time-efficient and reliable marketing services within the stipulated time."
        ]
      },
      {
        "heading": "All the services including Social Media Marketing, Search Engine Marketing, Search Engine Optimization, PPC marketing are delivered on the time and date mentioned in the agreement.",
        "paragraphs": [
          "After signing the agreement, we will begin our service with immediate effect on the date specified. To ensure the benefit of the client, we work closely, understand client requirements and deliver the services on time without any delay.",
          "Considering the website design and development, we will develop and deliver the website within 30 to 45 days depending on the number of pages & type of framework. If it is a dynamic site with more pages, days might increase. At any instant, our prices are all-inclusive and we do not charge extra after delivery or for the site delivery to the client.",
          "If you find any errors or want any changes to make after delivery, we will provide the needful service immediately.",
          "We ensure the satisfaction of our clients!!For any queries or information before or after delivery, kindly contact our support team at 9500555800 or mail us at support@eonsofttech.in"
        ]
      }
    ]
  },
  "privacy-policy": {
    "slug": "privacy-policy",
    "title": "Privacy Policy",
    "metaTitle": "Privacy Policy for Data Protection and User Security | Eon8",
    "metaDesc": "At EON8, accessible from https://www.eon8.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of",
    "lastUpdated": "October 2026",
    "sections": [
      {
        "heading": "Privacy Policy for EON8",
        "paragraphs": [
          "At EON8, accessible from https://www.eon8.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EON8 and how we use it.",
          "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.",
          "This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EON8. This policy is not applicable to any information collected offline or via channels other than this website."
        ]
      },
      {
        "heading": "Consent",
        "paragraphs": [
          "By using our website, you hereby consent to our Privacy Policy and agree to its terms."
        ]
      },
      {
        "heading": "Information we collect",
        "paragraphs": [
          "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.",
          "If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.",
          "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number."
        ]
      },
      {
        "heading": "How we use your information",
        "paragraphs": [
          "We use the information we collect in various ways, including to:",
          "• Provide, operate, and maintain our website",
          "• Improve, personalize, and expand our website",
          "• Understand and analyze how you use our website",
          "• Develop new products, services, features, and functionality",
          "• Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes",
          "• Send you emails",
          "• Find and prevent fraud"
        ]
      },
      {
        "heading": "Log Files",
        "paragraphs": [
          "EON8 follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information."
        ]
      },
      {
        "heading": "Cookies and Web Beacons",
        "paragraphs": [
          "Like any other website, EON8 uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.",
          "For more general information on cookies, please read “What Are Cookies”."
        ]
      },
      {
        "heading": "Google DoubleClick DART Cookie",
        "paragraphs": [
          "Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads"
        ]
      },
      {
        "heading": "Advertising Partners Privacy Policies",
        "paragraphs": [
          "You may consult this list to find the Privacy Policy for each of the advertising partners of EON8.",
          "Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on EON8, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.",
          "Note that EON8 has no access to or control over these cookies that are used by third-party advertisers."
        ]
      },
      {
        "heading": "Third Party Privacy Policies",
        "paragraphs": [
          "EON8’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.",
          "You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites."
        ]
      },
      {
        "heading": "CCPA Privacy Rights (Do Not Sell My Personal Information)",
        "paragraphs": [
          "Under the CCPA, among other rights, California consumers have the right to:",
          "Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.",
          "Request that a business delete any personal data about the consumer that a business has collected.",
          "Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.",
          "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
        ]
      },
      {
        "heading": "GDPR Data Protection Rights",
        "paragraphs": [
          "We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:",
          "The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.",
          "The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.",
          "The right to erasure – You have the right to request that we erase your personal data, under certain conditions.",
          "The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.",
          "The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.",
          "The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.",
          "If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us."
        ]
      },
      {
        "heading": "Children’s Information",
        "paragraphs": [
          "Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.",
          "EON8 does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.",
          "Communications We may contact you via e-mail or phone number that you’ve registered with EON8. For some of the clients like you, system-generated e-mails such as confirmations can be received for the proper admin operation. For any kind of communication, please write us to support@eonsofttech.in",
          "PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY USING THE WEBSITE, YOU DIRECTLY INDICATE THAT YOU AGREE, AND UNDERSTAND THE POLICY STATEMENTS. IF YOU DO NOT AGREE WITH THIS PRIVACY POLICY, DON’T MAKE USE OF THIS WEBSITE."
        ]
      }
    ]
  }
};
