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
        label: 'Label',
        value: 'label',
        type: 'multiselect',
        options: [
          {
            label: 'Withdraw',
            value: 'Withdraw'
          },
          {
            label: 'Swap',
            value: 'Swap'
          },
          {
            label: 'Deposit',
            value: 'Desposit'
          }
        ]
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
