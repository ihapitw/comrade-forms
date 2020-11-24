export const optionsDefault = {
  onSuccess() {},
  onError() {},
  utm: {
    prefix: '_uc_',
    params: [
      'ga_conversion_page',
      'ga_landing_page',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content'
    ]
  }
}

export const optionsHyperDefault = { revalidate: 'oninput' }
