const filters = [
  {
    label: 'Transactions',
    options: [
      {
        label: 'Txhash',
        value: 'txhash',
        type: 'text'
      },
      {
        label: 'Contract',
        value: 'contract',
        type: 'text'
      },
      {
        label: 'Recipient',
        value: 'recipient',
        type: 'text'
      },
      {
        label: 'Fee amount',
        value: 'feeAmount',
        type: 'number'
      },
      {
        label: 'Sent token',
        value: 'sentToken',
        type: 'text'
      },
      {
        label: 'Received token',
        value: 'receivedToken',
        type: 'text'
      },
      {
        label: 'Label',
        value: 'label',
        type: 'multiselect',
        options: [
          {
            label: 'Deposit',
            value: 'Deposit'
          },
          {
            label: 'Withdraw',
            value: 'Withdraw'
          },
          {
            label: 'Swap',
            value: 'Swap'
          },
          {
            label: 'Fail',
            value: 'Fail'
          }
        ]
      },
      {
        label: 'Only Unclassified',
        value: 'protocol',
        type: 'switch'
      },
      {
        label: 'Tag',
        value: 'tag',
        type: 'text'
      }
    ]
  }
];

export default filters;
