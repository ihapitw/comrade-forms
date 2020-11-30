export const optionsDefault = {
  onSuccess() {},
  onError() {},
  utm: {
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
export const cookiesForSend = [
  '_ga',
  '_uc_ga_conversion_page',
  '_uc_ga_landing_page',
  '_uc_utm_source',
  '_uc_utm_medium',
  '_uc_utm_campaign',
  '_uc_utm_term',
  '_uc_utm_content'
]
export const optionsHyperDefault = { revalidate: 'oninput' }
