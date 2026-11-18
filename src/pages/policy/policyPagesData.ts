export type PolicyInlineNode =
  | string
  | { type: 'strong'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'br' }
  | { type: 'link'; text: string; href: string; external?: boolean };

export type PolicyBlock =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; children: PolicyInlineNode[] }
  | { type: 'ul'; items: string[] }
  | { type: 'security-group'; heading?: string; blocks: PolicyBlock[] };

export interface PolicyDeliveryContent {
  intro: string;
  immediateHeading: string;
  immediateLead: string;
  immediateBody: PolicyInlineNode[];
  image: {
    src: string;
    srcSet: string;
    sizes: string;
    alt: string;
    width: number;
    height: number;
  };
  webDesignHeading: string;
  webDesignParagraphs: PolicyInlineNode[][];
}

export interface PolicyData {
  slug: string;
  pageId: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  layout: 'privacy-standard' | 'security-blocks' | 'split-delivery';
  blocks?: PolicyBlock[];
  delivery?: PolicyDeliveryContent;
}

const privacyPolicyBlocks: PolicyBlock[] = [
  { type: 'h2', text: 'Privacy Policy for EON8' },
  {
    type: 'p',
    children: [
      'At EON8, accessible from https://www.eon8.com/, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EON8 and how we use it.',
    ],
  },
  {
    type: 'p',
    children: [
      'If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.',
    ],
  },
  {
    type: 'p',
    children: [
      'This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in EON8. This policy is not applicable to any information collected offline or via channels other than this website.',
    ],
  },
  { type: 'h3', text: 'Consent' },
  {
    type: 'p',
    children: ['By using our website, you hereby consent to our Privacy Policy and agree to its terms.'],
  },
  { type: 'h3', text: 'Information we collect' },
  {
    type: 'p',
    children: [
      'The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.',
    ],
  },
  {
    type: 'p',
    children: [
      'If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.',
    ],
  },
  {
    type: 'p',
    children: [
      'When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.',
    ],
  },
  { type: 'h3', text: 'How we use your information' },
  {
    type: 'p',
    children: ['We use the information we collect in various ways, including to:'],
  },
  {
    type: 'ul',
    items: [
      'Provide, operate, and maintain our website',
      'Improve, personalize, and expand our website',
      'Understand and analyze how you use our website',
      'Develop new products, services, features, and functionality',
      'Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes',
      'Send you emails',
      'Find and prevent fraud',
    ],
  },
  { type: 'h3', text: 'Log Files' },
  {
    type: 'p',
    children: [
      'EON8 follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.',
    ],
  },
  { type: 'h3', text: 'Cookies and Web Beacons' },
  {
    type: 'p',
    children: [
      'Like any other website, EON8 uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.',
    ],
  },
  {
    type: 'p',
    children: [
      'For more general information on cookies, please read ',
      {
        type: 'link',
        text: '“What Are Cookies”',
        href: 'https://www.privacypolicyonline.com/what-are-cookies/',
        external: true,
      },
      '.',
    ],
  },
  { type: 'h3', text: 'Google DoubleClick DART Cookie' },
  {
    type: 'p',
    children: [
      'Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – ',
      {
        type: 'link',
        text: 'https://policies.google.com/technologies/ads',
        href: 'https://policies.google.com/technologies/ads',
        external: true,
      },
    ],
  },
  { type: 'h3', text: 'Advertising Partners Privacy Policies' },
  {
    type: 'p',
    children: [
      'You may consult this list to find the Privacy Policy for each of the advertising partners of EON8.',
    ],
  },
  {
    type: 'p',
    children: [
      'Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on EON8, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.',
    ],
  },
  {
    type: 'p',
    children: [
      'Note that EON8 has no access to or control over these cookies that are used by third-party advertisers.',
    ],
  },
  { type: 'h3', text: 'Third Party Privacy Policies' },
  {
    type: 'p',
    children: [
      'EON8’s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.',
    ],
  },
  {
    type: 'p',
    children: [
      'You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.',
    ],
  },
  { type: 'h3', text: 'CCPA Privacy Rights (Do Not Sell My Personal Information)' },
  {
    type: 'p',
    children: ['Under the CCPA, among other rights, California consumers have the right to:'],
  },
  {
    type: 'p',
    children: [
      'Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.',
    ],
  },
  {
    type: 'p',
    children: [
      'Request that a business delete any personal data about the consumer that a business has collected.',
    ],
  },
  {
    type: 'p',
    children: [
      'Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.',
    ],
  },
  {
    type: 'p',
    children: [
      'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
    ],
  },
  { type: 'h3', text: 'GDPR Data Protection Rights' },
  {
    type: 'p',
    children: [
      'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:',
    ],
  },
  {
    type: 'p',
    children: [
      'The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.',
    ],
  },
  {
    type: 'p',
    children: [
      'The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.',
    ],
  },
  {
    type: 'p',
    children: [
      'The right to erasure – You have the right to request that we erase your personal data, under certain conditions.',
    ],
  },
  {
    type: 'p',
    children: [
      'The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.',
    ],
  },
  {
    type: 'p',
    children: [
      'The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.',
    ],
  },
  {
    type: 'p',
    children: [
      'The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
    ],
  },
  {
    type: 'p',
    children: [
      'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
    ],
  },
  { type: 'h3', text: 'Children’s Information' },
  {
    type: 'p',
    children: [
      'Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.',
    ],
  },
  {
    type: 'p',
    children: [
      'EON8 does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.',
    ],
  },
  {
    type: 'p',
    children: [
      { type: 'strong', text: 'Communications' },
      { type: 'br' },
      'We may contact you via e-mail or phone number that you’ve registered with EON8. For some of the clients like you, system-generated e-mails such as confirmations can be received for the proper admin operation.',
      { type: 'br' },
      'For any kind of communication, please write us to ',
      {
        type: 'link',
        text: 'support@eonsofttech.in',
        href: 'mailto:support@eonsofttech.in',
      },
    ],
  },
  {
    type: 'p',
    children: [
      'PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY USING THE WEBSITE, YOU DIRECTLY INDICATE THAT YOU AGREE, AND UNDERSTAND THE POLICY STATEMENTS. IF YOU DO NOT AGREE WITH THIS PRIVACY POLICY, DON’T MAKE USE OF THIS WEBSITE.',
    ],
  },
];

export const policyPagesData: Record<string, PolicyData> = {
  'privacy-policy-2': {
    slug: 'privacy-policy-2',
    pageId: '134',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy for Data Protection and User Security | Eon8',
    metaDesc:
      'At EON8, one of our main priorities is the privacy of our visitors. Read how EON8 collects, safeguards, and processes visitor data.',
    layout: 'privacy-standard',
    blocks: privacyPolicyBlocks,
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    pageId: '134',
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy for Data Protection and User Security | Eon8',
    metaDesc:
      'At EON8, one of our main priorities is the privacy of our visitors. Read how EON8 collects, safeguards, and processes visitor data.',
    layout: 'privacy-standard',
    blocks: privacyPolicyBlocks,
  },
  'refund-policy': {
    slug: 'refund-policy',
    pageId: '41403',
    title: 'Refund Policy',
    metaTitle: 'Refund Policy Guidelines for Services and Payments | Eon8',
    metaDesc:
      'Our applications are designed to meet the requirements as specified by our client. Once the purchase has been made, EON8 is solely exempted and will not be',
    layout: 'security-blocks',
    blocks: [
      {
        type: 'security-group',
        heading: 'Refund Policy',
        blocks: [
          {
            type: 'p',
            children: [
              'Our applications are designed to meet the requirements as specified by our client. Once the purchase has been made, EON8 is solely exempted and will not be held responsible for the challenges faced by our client such as not meeting server requirements and delay in learning curve concerning the functionality of the application.',
            ],
          },
          {
            type: 'p',
            children: [
              'EON8 is not liable for any such challenges, and requesting a refund for any issues that are not per our agreement with the client will be deemed invalid, and therefore we retain all rights to deny the refund request from our client. We also do not provide a refund for installation charges or any other non-labor related charge.',
            ],
          },
          {
            type: 'p',
            children: [
              'That being said, support will be made available to our clients. Our representatives will be more than happy to help our clients with all the queries and provide suggestions to overcome the challenges faced and will work towards the success of our clients and to their much satisfaction.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Contact Information',
        blocks: [
          {
            type: 'p',
            children: [
              'If you have any questions about this EULA or wish to contact EON8 for any reason, please contact EON8 at:',
              { type: 'br' },
              { type: 'link', text: 'eon8', href: '/' },
              ' ',
              { type: 'strong', text: 'OR' },
              ' Email: ',
              {
                type: 'link',
                text: 'support@eonsofttech.in',
                href: 'mailto:support@eonsofttech.in',
              },
            ],
          },
        ],
      },
    ],
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    pageId: '41394',
    title: 'Terms And Conditions',
    metaTitle: 'Terms and Conditions for Website Usage and Services | Eon8',
    metaDesc:
      'Please read these Terms and Conditions (“Terms”, “Terms and Conditions”) carefully before using',
    layout: 'security-blocks',
    blocks: [
      {
        type: 'security-group',
        blocks: [
          {
            type: 'p',
            children: [
              'Please read these Terms and Conditions (“Terms”, “Terms and Conditions”) carefully before using',
            ],
          },
          {
            type: 'p',
            children: [
              'Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.',
            ],
          },
          {
            type: 'p',
            children: [
              'By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service. This Terms and Conditions agreement for EON8 is ',
              {
                type: 'link',
                text: 'generated by TermsFeed',
                href: 'https://termsfeed.com/terms-conditions/generator/',
                external: true,
              },
              '.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Accounts',
        blocks: [
          {
            type: 'p',
            children: [
              'When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.',
            ],
          },
          {
            type: 'p',
            children: [
              'You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.',
            ],
          },
          {
            type: 'p',
            children: [
              'You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Links To Other Web Sites',
        blocks: [
          {
            type: 'p',
            children: [
              'Our Service may contain links to third-party web sites or services that are not owned or controlled by EON8.',
            ],
          },
          {
            type: 'p',
            children: [
              'EON8 has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that EON8 shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.',
            ],
          },
          {
            type: 'p',
            children: [
              'We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Termination',
        blocks: [
          {
            type: 'p',
            children: [
              'We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
            ],
          },
          {
            type: 'p',
            children: [
              'All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.',
            ],
          },
          {
            type: 'p',
            children: [
              'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.',
            ],
          },
          {
            type: 'p',
            children: [
              'Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.',
            ],
          },
          {
            type: 'p',
            children: [
              'All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Dismissal Without Prejudice To Any Other Rights',
        blocks: [
          {
            type: 'p',
            children: [
              'EON8 can terminate this EULA in case of infringement of any term or condition referred to in the EULA by you. In that event, the Licensee accepts to return to Licensor or demolish all documents and information related to the Software or Application upon the dismissal of the License.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Refund Policy',
        blocks: [
          {
            type: 'p',
            children: [
              'Our applications are designed to meet the requirements as specified by our client. Once the purchase has been made, EON8 is solely exempted and will not be held responsible for the challenges faced by our client such as not meeting server requirements and delay in learning curve concerning the functionality of the application.',
            ],
          },
          {
            type: 'p',
            children: [
              'EON8 is not liable for any such challenges, and requesting a refund for any issues that are not per our agreement with the client will be deemed invalid, and therefore we retain all rights to deny the refund request from our client. We also do not provide a refund for installation charges or any other non-labor related charge.',
            ],
          },
          {
            type: 'p',
            children: [
              'That being said, support will be made available to our clients. Our representatives will be more than happy to help our clients with all the queries and provide suggestions to overcome the challenges faced and will work towards the success of our clients and to their much satisfaction.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Governing Law',
        blocks: [
          {
            type: 'p',
            children: [
              'These Terms shall be governed and construed in accordance with the laws of Tamil Nadu, India, without regard to its conflict of law provisions.',
            ],
          },
          {
            type: 'p',
            children: [
              'Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Change',
        blocks: [
          {
            type: 'p',
            children: [
              'We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.',
            ],
          },
          {
            type: 'p',
            children: [
              'By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.',
            ],
          },
        ],
      },
      {
        type: 'security-group',
        heading: 'Contact Information',
        blocks: [
          {
            type: 'p',
            children: [
              'If you have any questions about this EULA or wish to contact EON8 for any reason, please contact EON8 at:',
              { type: 'br' },
              { type: 'link', text: 'eon8.com', href: '/' },
              ' ',
              { type: 'strong', text: 'OR' },
              ' Email: ',
              {
                type: 'link',
                text: 'support@eonsofttech.in',
                href: 'mailto:support@eonsofttech.in',
              },
            ],
          },
        ],
      },
    ],
  },
  'delivery-policy': {
    slug: 'delivery-policy',
    pageId: '41615',
    title: 'Delivery Policy',
    metaTitle: 'Delivery Policy Details and Service Terms Guide | Eon8',
    metaDesc:
      'The delivery policy is committed to delivering the promised Digital marketing services as per the best quality package chosen by the client. EON8 is aimed at',
    layout: 'split-delivery',
    delivery: {
      intro:
        'The delivery policy is committed to delivering the promised Digital marketing services as per the best quality package chosen by the client. EON8 is aimed at delivering time-efficient and reliable marketing services within the stipulated time.',
      immediateHeading: 'What kind of services are delivered immediately?',
      immediateLead:
        'All the services including Social Media Marketing, Search Engine Marketing, Search Engine Optimization, PPC marketing are delivered on the time and date mentioned in the agreement.',
      immediateBody: [
        'After signing the agreement, we will begin our service with ',
        { type: 'italic', text: 'immediate ' },
        'effect on the date specified. To ensure the benefit of the client, we work closely, understand client requirements and deliver the services on time without any delay.',
      ],
      image: {
        src: '/wp-content/uploads/2021/07/shutterstock_208664626-1024x768.jpg',
        srcSet:
          '/wp-content/uploads/2021/07/shutterstock_208664626-1024x768.jpg 1024w, /wp-content/uploads/2021/07/shutterstock_208664626-300x225.jpg 300w, /wp-content/uploads/2021/07/shutterstock_208664626-768x576.jpg 768w, /wp-content/uploads/2021/07/shutterstock_208664626-1536x1152.jpg 1536w, /wp-content/uploads/2021/07/shutterstock_208664626-2048x1536.jpg 2048w',
        sizes: '(max-width: 780px) 100vw, 780px',
        alt: 'EON8 Service Delivery Commitment',
        width: 780,
        height: 585,
      },
      webDesignHeading: 'What about the delivery of website design and development?',
      webDesignParagraphs: [
        [
          'Considering the website design and development, we will develop and deliver the website within 30 to 45 days depending on the number of pages & type of framework. If it is a dynamic site with more pages, days might increase. At any instant, our prices are all-inclusive and we do not charge extra after delivery or for the site delivery to the client.',
        ],
        [
          'If you find any errors or want any changes to make after delivery, we will provide the needful service immediately.',
        ],
        [
          'We ensure the satisfaction of our clients!!',
          { type: 'br' },
          'For any queries or information before or after delivery, kindly contact our support team at 9500555800 or mail us at ',
          {
            type: 'link',
            text: 'support@eonsofttech.in',
            href: 'mailto:support@eonsofttech.in',
          },
        ],
      ],
    },
  },
};
