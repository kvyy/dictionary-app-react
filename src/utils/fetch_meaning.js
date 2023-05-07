async function fetchMeaning(query) {
  let response
  try {
    response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`)
  } catch (error) {
    throw new Error(
      `There was a problem while searching for "${query}", please check your network connection and try again.`
    )
  }

  return response
}

async function parseSearchData(query) {
  const response = await fetchMeaning(query)
  const searchData = await response.json()

  if (response.status === 404) {
    return { parsedSearchData: searchData, notFound: true }
  }

  const { word, phonetics, sourceUrls } = searchData[0]
  const parsedSearchData = {}

  const phonetic = parsePhonetics(phonetics)
  const sourceURL = sourceUrls[0]
  const definitions = searchData.reduce((prev, { meanings }) => {
    prev.push(...meanings)
    return prev
  }, [])

  Object.assign(parsedSearchData, { word, phonetic, definitions, sourceURL })

  return { parsedSearchData, notFound: false }
}

function parsePhonetics(phonetics) {
  const parsedPhonetic = {}
  for (const { text, audio } of phonetics) {
    if (text && audio) {
      Object.assign(parsedPhonetic, { text, audio })
      break
    }

    if (parsedPhonetic.text && parsedPhonetic.audio) break

    parsedPhonetic.text ??= text
    parsedPhonetic.audio ??= audio
  }

  return parsedPhonetic
}

const getDefinitions = async query => parseSearchData(query)

export default getDefinitions
