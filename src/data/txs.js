const taxappviews = {
  regular: [
    { id: 'sTxHash', label: 'Tx hash', alignRight: false },
    { id: 'blockHeight', label: 'Block height', alignRight: false, minWidth: 100 },
    { id: 'rTimestamp', label: 'Timestamp', alignRight: false },
    { id: 'label', label: 'Label', alignRight: false },
    { id: 'tag', label: 'Tag', alignRight: false },
    { id: 'sContract', label: 'Contract', alignRight: false },
    { id: 'sSender', label: 'Sender', alignRight: false },
    { id: 'sRecipient', label: 'Recipient', alignRight: false },
    { id: 'receivedAmount', label: 'Received amount', alignRight: false },
    { id: 'receivedToken', label: 'Received token', alignRight: false },
    { id: 'sentAmount', label: 'Sent amount', alignRight: false },
    { id: 'sentToken', label: 'Sent token', alignRight: false },
    { id: 'feeAmount', label: 'Fee amount', alignRight: false },
    { id: 'feeToken', label: 'Fee token', alignRight: false },
    { id: 'taxAmount', label: 'Tax amount', alignRight: false },
    { id: 'taxToken', label: 'Tax token', alignRight: false },
    { id: 'netWorthAmount', label: 'Networth amount', alignRight: false },
    { id: 'netWorthToken', label: 'Networth token', alignRight: false },
    { id: 'memo', label: 'Memo', alignRight: false },
    { id: 'friendlyDescription', label: 'Friendly description', alignRight: false }
  ],

  koinly: [
    { id: 'rTimestamp', label: 'Timestamp', alignRight: false },
    { id: 'sentAmount', label: 'Sent Amount', alignRight: false },
    { id: 'sentToken', label: 'Sent Currency', alignRight: false },
    { id: 'receivedAmount', label: 'Received Amount', alignRight: false },
    { id: 'receivedToken', label: 'Received Currency', alignRight: false },
    { id: 'feeAmount', label: 'Fee Amount', alignRight: false },
    { id: 'feeToken', label: 'Fee Currency', alignRight: false },
    { id: 'netWorthAmount', label: 'Networth Amount', alignRight: false },
    { id: 'netWorthToken', label: 'Networth Currency', alignRight: false },
    { id: 'label', label: 'Label', alignRight: false },
    { id: 'tag', label: 'Tag', alignRight: false },
    { id: 'friendlyDescription', label: 'Description', alignRight: false },
    { id: 'txhash', label: 'Tx hash', alignRight: false }
  ],

  cointracker: [
    { id: 'rTimestamp', label: 'Timestamp', alignRight: false },
    { id: 'receivedAmount', label: 'Received amount', alignRight: false },
    { id: 'receivedToken', label: 'Received token', alignRight: false },
    { id: 'sentAmount', label: 'Sent amount', alignRight: false },
    { id: 'sentToken', label: 'Sent token', alignRight: false },
    { id: 'feeAmount', label: 'Fee amount', alignRight: false },
    { id: 'feeToken', label: 'Fee token', alignRight: false },
    { id: 'label', label: 'Label', alignRight: false },
    { id: 'tag', label: 'Tag', alignRight: false }
  ]
};

export const Taxappviews = ['regular', 'koinly', 'cointracker'];

export const getTaxAppViewData = (taxappview) => taxappviews[taxappview];
