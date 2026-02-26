export const FAQ_ITEMS = [
  {
    text: "Camera equipment should never be plugged into switches",
  },
  {
    text: "Audio/Visual (AV) equipment has a Receiver / Controller",
    subItems: ["AV equipment is owned by the store"],
  },
  {
    text: "OTP's should not be asked to call PAR support — it's our Axiom technicians' responsibility",
  },
  {
    text: "It is not Mandatory to move the RHS and BOS server (per Darrell), especially if it's difficult to do or the OTP is requesting",
  },
  {
    text: "We never authorize our Techs to extend or splice data cables",
  },
  {
    text: "OTP's and Store Managers are not our friends — they will throw you under the bus if they are cornered",
  },
  {
    text: "Our Tech's always need confirmation that a site (store) is in backup mode",
    subItems: [
      "Especially before unplugging anything",
      "Lately we have been told that PAR support can and will do it remotely",
    ],
  },
  {
    text: "Moving and relocating PDU's and UPS will alleviate issues in the end, if the right Deliverable needs to be re-done",
  },
  {
    text: 'NO Axiom tech should leave a site until it is in "Primary mode" and PAR Support provides a checkout code',
    subItems: [
      "Checkout codes are an authentication that the site is fully functional",
    ],
  },
  {
    text: "JOT forms filled out in detail are super important, for when McDonald's reviews the site with PAR",
    subItems: [
      "Detailed notes on what the tech did, issues they encountered and/or notes of clarity about what took place the previous evening are vital",
    ],
  },
  {
    text: "When sending email communications to Hannah, ALWAYS copy McDInstallations@partech.com",
  },
  {
    text: "8U Racks are typically 15 inches long (front to back) — add another 15 inches for clearance wherever placed",
  },
  {
    text: "NO cables ever get left on the floor (including power cables)",
  },
  {
    text: "Electrical Homeruns are mainly used when an 8U is installed or moved and the new location is too far from the UPS for PDU1 to reach",
    subItems: [
      "Instructions and details are included in the Axiom guide to Remediation",
      "Deliverables with multiple pictures showing connectivity are required",
    ],
  },
];

export const PRE_CHECK_IN = [
  { label: "Prepare folder for deliverables", description: "" },
  { label: "Pre Call", description: "" },
  { label: "Monday board", description: "" },
  { label: "Create chat in dialpad", description: "" },
];

export const AFTER_TECH_ARRIVES_ON_SITE = [
  { label: "Confirmned an OTP or Manager is on site" },
  { label: "Confirmned site is in backup mode" },
  { label: "Received photos of open box equipment" },
];

export const DELIVERABLES = [
  {
    label: `Rack U-count labeled correctly (77" = U38 start / 82" = U42 start)`,
    images: ["/deliverable-examples/8u-network-rack.jpg"],
  },
  {
    label:
      "2-inch between the rack and the 8u or the 8u and the ceiling clearance verified and photographed",
    images: ["/deliverable-examples/2-inch-rack-clearance.jpg"],
  },
  {
    label: `15-inch workable space verified in front of the 8u or 82" rack (measuring tape)`,
    images: ["/deliverable-examples/15-inches-front-workable-space.jpg"],
  },
  {
    label: `Cleared Edge Space maintained (77" U29\u201331 / 82" U25\u201327)`,
    images: [
      "/deliverable-examples/77-inch-rack-cleared-edge-space.jpg",
      "/deliverable-examples/82-inch-rack-cleared.jpg",
    ],
  },
  {
    label: `PDU1 & PDU2 installed at correct U-count for rack type (77" 8U 1 & U32 / 82" U34 & U28)`,
    images: [
      "/deliverable-examples/77-inch-pdu-2-placement.jpg",
      "/deliverable-examples/82-inch-pdu-2-placement.jpg",
    ],
  },
  {
    label: "PDU cables routed over the top only",
    images: ["/deliverable-examples/pdu-cabling.jpg"],
  },
  {
    label: "UPS powered ON and rails installed",
    images: ["/deliverable-examples/ups-powered-on.jpg"],
  },
  {
    label: "Both SW1 + SW2 Labeled Correctly",
    images: ["/deliverable-examples/switch-1-2-labeled.jpg"],
  },
  {
    label: "Both PDU's labeled Correctly",
    images: ["/deliverable-examples/pdu-1-2-labeled.png"],
  },
  {
    label: "SW1 & SW2 ports 5\u20139 capped",
    images: ["/deliverable-examples/switches-5-9-black-capped.jpg"],
  },
  {
    label: "48 - Port Patch panel",
    images: ["/deliverable-examples/48-port-patch-panel-standard.jpg"],
  },
  {
    label: `8U rack layout match standard (77" Inch Only)`,
    images: ["/deliverable-examples/77-network-rack-format.jpg"],
  },
  {
    label: "Biscuit boxes labeled EXACTLY per standard (Panduit Used)",
    images: ["/deliverable-examples/edge-nodes.jpg"],
  },
  {
    label:
      "Thin Edge Client labeled and within 2.5 ft of workstation (Panduit Used)",
    images: ["/deliverable-examples/edge-thin-client-workstation.jpg"],
  },
  {
    label: "RHS & BOS servers labeled",
    images: ["/deliverable-examples/rhs-bos.jpg"],
  },
  {
    label: "Port testing photos show PASS + port number",
    images: ["/deliverable-examples/port-testing.png"],
  },
  {
    label: "STOP poster placed on rack",
    images: ["/deliverable-examples/stop-poster.jpg"],
  },
  {
    label: "Wide-angle photo shows both racks (or clear separation)",
    images: ["/deliverable-examples/wide-angle-rack-context.jpg"],
  },
];
