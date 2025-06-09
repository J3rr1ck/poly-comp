interface IdeologyAnalysis {
  primaryIdeology: string
  description: string
  characteristics: string[]
  notableFigures: Array<{ name: string; role: string }>
  secondaryIdeologies: string[]
  modernContext: string
  color: string
}

export const ideologyDetailsMap = new Map<string, { description: string }>([
  [
    "Fully Automated Luxury Gay Space Communist",
    {
      description:
        "Envisions a post-scarcity future with advanced technology, universal LGBTQ+ rights, and communist expansion to space.",
    },
  ],
  [
    "Libertarian Socialist",
    {
      description:
        "Advocates for maximal individual freedom alongside collective ownership of production, opposing state and corporate control.",
    },
  ],
  [
    "Social Liberal",
    {
      description: "Supports a mixed economy with strong social safety nets and robust individual freedoms and rights.",
    },
  ],
  [
    "Crypto-Anarchist",
    {
      description:
        "Advocates for using technology like cryptography and digital currencies to create a stateless, voluntary society.",
    },
  ],
  [
    "Classical Liberal",
    {
      description: "Emphasizes free markets, individual liberty, and limited government intervention in economic and personal life.",
    },
  ],
  [
    "Moderate Libertarian",
    {
      description:
        "Favors free markets and personal liberty while accepting a pragmatic, limited role for government in certain areas.",
    },
  ],
  [
    "Eco-Socialist",
    {
      description:
        "Believes strong state action is vital to address climate change and inequality, potentially restructuring the economy on socialist lines.",
    },
  ],
  [
    "Social Democrat",
    {
      description:
        "Supports a strong welfare state, government regulation, and democratic institutions to achieve social and economic equality.",
    },
  ],
  [
    "Neo-Reactionary",
    {
      description:
        "Rejects democracy for more hierarchical governance models, sometimes envisioning corporate city-states or monarchies.",
    },
  ],
  [
    "Alt-Right",
    {
      description: "Focuses on cultural preservation and identity, often with nationalist and traditionalist social views.",
    },
  ],
  [
    "Conservative",
    {
      description: "Supports free-market principles combined with traditional social values and strong, established institutions.",
    },
  ],
  [
    "Centrist",
    {
      description:
        "Holds a moderate political position, balancing elements from different ideologies to find pragmatic solutions.",
    },
  ],
  [
    "Accelerationist Tendencies",
    {
      description:
        "Believes in accelerating societal change, often through technology or radical politics, towards a transformed future.",
    },
  ],
  [
    "Post-Liberal",
    {
      description:
        "Critiques aspects of classical liberalism, often emphasizing community, tradition, or new forms of social order.",
    },
  ],
  [
    "Anarchist Sympathies",
    {
      description:
        "Expresses affinity with anarchist ideals such as decentralization, voluntary association, and skepticism of authority.",
    },
  ],
])

interface CategoryTally {
  stronglyAgree: number
  agree: number
  neutral: number
  disagree: number
  stronglyDisagree: number
}

export interface IdeologyAnalysisInput {
  economic: number
  social: number
  categoryTallies?: Record<string, CategoryTally> // categoryTallies from localStorage
}

export function getIdeologyAnalysis(input: IdeologyAnalysisInput): IdeologyAnalysis {
  const { economic, social, categoryTallies = {} } = input

  const isLeft = economic < 0
  const isLibertarian = social < 0
  const economicIntensity = Math.abs(economic)
  const socialIntensity = Math.abs(social)

  let primaryIdeology: string
  let description: string
  let characteristics: string[]
  let notableFigures: Array<{ name: string; role: string }>
  let modernContext: string
  let color: string

  if (isLeft && isLibertarian) {
    if (economicIntensity > 7 && socialIntensity > 7) {
      primaryIdeology = "Fully Automated Luxury Gay Space Communist"
      description =
        "You envision a post-scarcity future where advanced technology eliminates work, LGBTQ+ rights are universal, and humanity expands to the stars under a communist system."
      characteristics = [
        "Believes in complete automation of labor through AI and robotics",
        "Supports universal LGBTQ+ rights and gender liberation",
        "Advocates for space exploration and colonization",
        "Envisions a post-scarcity communist society",
        "Embraces radical technological acceleration",
      ]
      notableFigures = [
        { name: "Fully Automated Luxury Communism", role: "Theoretical Framework" },
        { name: "Mark Fisher", role: "Cultural Theorist" },
        { name: "Donna Haraway", role: "Cyborg Feminist" },
      ]
      modernContext =
        "This ideology combines accelerationist technology with queer liberation and communist economics, popular in online leftist spaces."
      color = "#FF69B4"
    } else if (economicIntensity > 5) {
      primaryIdeology = "Libertarian Socialist"
      description =
        "You believe in maximum individual freedom combined with collective ownership of the means of production. You oppose both state control and corporate capitalism."
      characteristics = [
        "Strong support for civil liberties and personal freedom",
        "Advocates for worker ownership and democratic workplaces",
        "Opposes both government and corporate authoritarianism",
        "Supports decentralized, community-based decision making",
      ]
      notableFigures = [
        { name: "Noam Chomsky", role: "Linguist & Political Activist" },
        { name: "Murray Bookchin", role: "Social Ecologist" },
        { name: "Peter Kropotkin", role: "Anarchist Theorist" },
      ]
      modernContext = "Popular among young progressives who distrust both big government and big corporations."
      color = "#10B981"
    } else {
      primaryIdeology = "Social Liberal"
      description = "You support a mixed economy with strong social programs while maintaining individual freedoms."
      characteristics = [
        "Supports progressive taxation and social safety nets",
        "Strong advocate for civil rights and liberties",
        "Believes in regulated capitalism with worker protections",
        "Supports environmental protection and social justice",
      ]
      notableFigures = [
        { name: "Alexandria Ocasio-Cortez", role: "US Representative" },
        { name: "Bernie Sanders", role: "US Senator" },
        { name: "John Rawls", role: "Political Philosopher" },
      ]
      modernContext = "Mainstream progressive position in modern democratic societies."
      color = "#3B82F6"
    }
  } else if (!isLeft && isLibertarian) {
    if (economicIntensity > 7 && socialIntensity > 7) {
      primaryIdeology = "Crypto-Anarchist"
      description =
        "You believe in using technology, especially blockchain and cryptography, to create a stateless society based on voluntary exchange and digital currencies."
      characteristics = [
        "Advocates for cryptocurrency replacing government money",
        "Supports complete digital privacy and anonymity",
        "Believes technology can eliminate the need for government",
        "Embraces radical decentralization of all institutions",
        "Supports unrestricted free markets in cyberspace",
      ]
      notableFigures = [
        { name: "Satoshi Nakamoto", role: "Bitcoin Creator" },
        { name: "Timothy C. May", role: "Crypto-Anarchist Manifesto" },
        { name: "Ross Ulbricht", role: "Silk Road Founder" },
      ]
      modernContext =
        "Emerging ideology combining libertarian economics with cutting-edge technology and digital rights."
      color = "#F59E0B"
    } else if (economicIntensity > 5) {
      primaryIdeology = "Classical Liberal"
      description = "You support free markets and individual liberty with limited government intervention."
      characteristics = [
        "Supports free market capitalism with minimal regulation",
        "Strong advocate for individual rights and freedoms",
        "Believes in limited government and fiscal responsibility",
        "Supports meritocracy and equal opportunity",
      ]
      notableFigures = [
        { name: "Milton Friedman", role: "Economist" },
        { name: "Friedrich Hayek", role: "Economist & Philosopher" },
        { name: "Ron Paul", role: "Former US Representative" },
      ]
      modernContext = "Traditional American conservative/libertarian position, popular in tech and business circles."
      color = "#EAB308"
    } else {
      primaryIdeology = "Moderate Libertarian"
      description =
        "You generally favor free markets and personal liberty while accepting some government role in society."
      characteristics = [
        "Supports most free market policies",
        "Values personal freedom and civil liberties",
        "Accepts limited government intervention when necessary",
        "Pragmatic approach to policy solutions",
      ]
      notableFigures = [
        { name: "Gary Johnson", role: "Former Presidential Candidate" },
        { name: "Justin Amash", role: "Former US Representative" },
        { name: "Reason Magazine", role: "Libertarian Publication" },
      ]
      modernContext = "Mainstream libertarian position in American politics."
      color = "#FBBF24"
    }
  } else if (isLeft && !isLibertarian) {
    if (economicIntensity > 6 && socialIntensity > 6) {
      primaryIdeology = "Eco-Socialist"
      description =
        "You believe strong government action is necessary to address climate change and economic inequality, even if it requires restricting some individual freedoms."
      characteristics = [
        "Supports extensive government control to combat climate change",
        "Believes capitalism is incompatible with environmental protection",
        "Advocates for planned economy to reduce consumption",
        "Supports restrictions on individual behavior for collective good",
        "May support authoritarian measures for environmental protection",
      ]
      notableFigures = [
        { name: "Greta Thunberg", role: "Climate Activist" },
        { name: "Extinction Rebellion", role: "Environmental Movement" },
        { name: "Joel Kovel", role: "Eco-Socialist Theorist" },
      ]
      modernContext =
        "Growing movement combining environmental urgency with socialist economics and potentially authoritarian methods."
      color = "#059669"
    } else {
      primaryIdeology = "Social Democrat"
      description =
        "You support a strong welfare state and government regulation while maintaining democratic institutions."
      characteristics = [
        "Supports comprehensive welfare state",
        "Believes in progressive taxation and wealth redistribution",
        "Advocates for strong labor unions and worker rights",
        "Supports government regulation of business",
      ]
      notableFigures = [
        { name: "Nordic Model", role: "Scandinavian Countries" },
        { name: "Elizabeth Warren", role: "US Senator" },
        { name: "Jeremy Corbyn", role: "Former UK Labour Leader" },
      ]
      modernContext = "Popular European-style social democracy, gaining traction in American progressive politics."
      color = "#DC2626"
    }
  } else {
    if (economicIntensity > 7 && socialIntensity > 7) {
      primaryIdeology = "Neo-Reactionary"
      description =
        "You believe democracy has failed and should be replaced with more efficient, hierarchical forms of governance, possibly including corporate city-states or monarchies."
      characteristics = [
        "Rejects democratic governance as inefficient",
        "Supports hierarchical social structures",
        "Believes in natural inequality between groups",
        "Advocates for corporate or monarchical governance",
        "Embraces technological acceleration under strong leadership",
      ]
      notableFigures = [
        { name: "Curtis Yarvin", role: "Neo-Reactionary Theorist" },
        { name: "Nick Land", role: "Accelerationist Philosopher" },
        { name: "Peter Thiel", role: "Tech Entrepreneur" },
      ]
      modernContext =
        "Emerging ideology in tech circles, influenced by Silicon Valley's frustration with democratic processes."
      color = "#7C3AED"
    } else if (socialIntensity > 5 && economicIntensity < 3) {
      primaryIdeology = "Alt-Right"
      description =
        "You combine nationalist and traditionalist social views with skepticism of free-market economics, focusing on cultural preservation and identity."
      characteristics = [
        "Strong emphasis on cultural and ethnic nationalism",
        "Skeptical of globalization and multiculturalism",
        "Supports traditional gender roles and family structures",
        "May support economic protectionism",
        "Focuses on preserving Western/European culture",
      ]
      notableFigures = [
        { name: "Richard Spencer", role: "White Nationalist" },
        { name: "Steve Bannon", role: "Political Strategist" },
        { name: "Tucker Carlson", role: "Media Personality" },
      ]
      modernContext =
        "Movement that gained prominence during the 2016 election, combining nationalism with internet culture."
      color = "#6B21A8"
    } else {
      primaryIdeology = "Conservative"
      description =
        "You support free market principles combined with traditional social values and strong institutions."
      characteristics = [
        "Supports free market capitalism with some regulation",
        "Advocates for traditional family and social values",
        "Believes in strong law and order",
        "Supports gradual rather than radical change",
      ]
      notableFigures = [
        { name: "Ronald Reagan", role: "40th US President" },
        { name: "Margaret Thatcher", role: "Former UK Prime Minister" },
        { name: "Ben Shapiro", role: "Political Commentator" },
      ]
      modernContext = "Traditional conservative position, dominant in Republican politics."
      color = "#8B5CF6"
    }
  }

  const secondaryIdeologies: string[] = []

  // Categorical Trigger Logic
  // Example for Accelerationist Tendencies
  const accFocusTally = categoryTallies?.accelerationistFocus
  if (accFocusTally) {
    if ((accFocusTally.stronglyAgree >= 1 && accFocusTally.agree >= 1) || accFocusTally.stronglyAgree >= 2) {
      if (primaryIdeology !== "Accelerationist Tendencies" && !secondaryIdeologies.includes("Accelerationist Tendencies")) {
        secondaryIdeologies.push("Accelerationist Tendencies")
      }
    }
  }

  // Example for Post-Liberal
  const postLibFocusTally = categoryTallies?.postLiberalFocus
  if (postLibFocusTally) {
    if ((postLibFocusTally.stronglyAgree >= 1 && postLibFocusTally.agree >= 1) || postLibFocusTally.stronglyAgree >= 2) {
      if (primaryIdeology !== "Post-Liberal" && !secondaryIdeologies.includes("Post-Liberal")) {
        secondaryIdeologies.push("Post-Liberal")
      }
    }
  }

  // Example for Anarchist Sympathies
  const anarchistFocusTally = categoryTallies?.anarchistFocus
  if (anarchistFocusTally) {
    if ((anarchistFocusTally.stronglyAgree >= 1 && anarchistFocusTally.agree >= 1) || anarchistFocusTally.stronglyAgree >= 2) {
      if (primaryIdeology !== "Anarchist Sympathies" && !secondaryIdeologies.includes("Anarchist Sympathies")) {
        secondaryIdeologies.push("Anarchist Sympathies")
      }
    }
  }

  // Example for specific "Alt-Right" focus
  const altRightFocusTally = categoryTallies?.altRightFocus
  if (altRightFocusTally) {
    if (altRightFocusTally.stronglyAgree >= 2 || (altRightFocusTally.stronglyAgree >= 1 && altRightFocusTally.agree >= 2)) {
      if (primaryIdeology !== "Alt-Right" && !secondaryIdeologies.includes("Alt-Right")) {
        secondaryIdeologies.push("Alt-Right")
      }
    }
  }

  // Example for specific "FALGSC" focus
  const falgscFocusTally = categoryTallies?.falgscFocus
  if (falgscFocusTally) {
    if (falgscFocusTally.stronglyAgree >= 2 || (falgscFocusTally.stronglyAgree >= 1 && falgscFocusTally.agree >= 2)) {
      if (primaryIdeology !== "Fully Automated Luxury Gay Space Communist" && !secondaryIdeologies.includes("Fully Automated Luxury Gay Space Communist")) {
        secondaryIdeologies.push("Fully Automated Luxury Gay Space Communist")
      }
    }
  }

  // For Crypto-Anarchist
  const cryptoFocusTally = categoryTallies?.cryptoAnarchistFocus
  if (cryptoFocusTally) {
    if ((cryptoFocusTally.stronglyAgree >= 1 && cryptoFocusTally.agree >= 1) || cryptoFocusTally.stronglyAgree >= 2) {
      if (primaryIdeology !== "Crypto-Anarchist" && !secondaryIdeologies.includes("Crypto-Anarchist")) {
        secondaryIdeologies.push("Crypto-Anarchist")
      }
    }
  }

  // For Neo-Reactionary
  const neoReactionaryFocusTally = categoryTallies?.neoReactionaryFocus
  if (neoReactionaryFocusTally) {
    if ((neoReactionaryFocusTally.stronglyAgree >= 1 && neoReactionaryFocusTally.agree >= 1) || neoReactionaryFocusTally.stronglyAgree >= 2) {
      if (primaryIdeology !== "Neo-Reactionary" && !secondaryIdeologies.includes("Neo-Reactionary")) {
        secondaryIdeologies.push("Neo-Reactionary")
      }
    }
  }

  // For Eco-Socialist
  const ecoSocialistFocusTally = categoryTallies?.ecoSocialistFocus
  if (ecoSocialistFocusTally) {
    if ((ecoSocialistFocusTally.stronglyAgree >= 1 && ecoSocialistFocusTally.agree >= 1) || ecoSocialistFocusTally.stronglyAgree >= 2) {
      if (primaryIdeology !== "Eco-Socialist" && !secondaryIdeologies.includes("Eco-Socialist")) {
        secondaryIdeologies.push("Eco-Socialist")
      }
    }
  }

  // Existing score-based secondary ideologies logic
  if (Math.abs(economic) < 3 && Math.abs(social) < 3) {
    if (!secondaryIdeologies.includes("Centrist")) {
      secondaryIdeologies.push("Centrist")
    }
  }

  // Refined condition for "Accelerationist Tendencies"
  if (economicIntensity > 4.5 || socialIntensity > 4.5) {
    if (!secondaryIdeologies.includes("Accelerationist Tendencies")) {
      secondaryIdeologies.push("Accelerationist Tendencies")
    }
  }

  // Note: The original logic for Post-Liberal and Anarchist Sympathies might overlap
  // or conflict with the new detailed ideology definitions.
  // For now, we are adding the new logic additively.
  // A future refactor might integrate these more cleanly.

  // Refined condition for "Post-Liberal"
  if (social < -4.5 && socialIntensity > 4.5) {
    if (!secondaryIdeologies.includes("Post-Liberal")) {
      secondaryIdeologies.push("Post-Liberal")
    }
  }

  // Refined condition for "Anarchist Sympathies"
  if (economic < -4.5 && social < -2.5 && (economicIntensity > 4.5 || socialIntensity > 2.5)) {
    if (!secondaryIdeologies.includes("Anarchist Sympathies")) {
      secondaryIdeologies.push("Anarchist Sympathies")
    }
  }

  // Define alternative/future ideologies and their conditions
  const alternativeIdeologies = [
    {
      name: "Fully Automated Luxury Gay Space Communist",
      isPrimary: () => economic < 0 && isLibertarian && economicIntensity > 7 && socialIntensity > 7,
      isSecondary: () => economic < 0 && isLibertarian && economicIntensity > 5 && socialIntensity > 5,
    },
    {
      name: "Crypto-Anarchist",
      isPrimary: () => economic > 0 && isLibertarian && economicIntensity > 7 && socialIntensity > 7,
      isSecondary: () => economic > 0 && isLibertarian && economicIntensity > 5 && socialIntensity > 5,
    },
    {
      name: "Neo-Reactionary",
      isPrimary: () => economic > 0 && !isLibertarian && economicIntensity > 7 && socialIntensity > 7,
      isSecondary: () => economic > 0 && !isLibertarian && economicIntensity > 5 && socialIntensity > 5,
    },
    {
      name: "Eco-Socialist",
      isPrimary: () => economic < 0 && !isLibertarian && economicIntensity > 6 && socialIntensity > 6,
      isSecondary: () => economic < 0 && !isLibertarian && economicIntensity > 4 && socialIntensity > 4,
    },
    {
      name: "Alt-Right",
      isPrimary: () => economic > 0 && !isLibertarian && socialIntensity > 5 && economicIntensity < 3,
      isSecondary: () => economic > 0 && !isLibertarian && socialIntensity > 3 && economicIntensity < 5,
    },
    // "Accelerationist Tendencies", "Post-Liberal", "Anarchist Sympathies" are already handled by existing broader logic.
    // We can refine this later if needed to use these specific structures.
  ]

  for (const altIdeology of alternativeIdeologies) {
    if (altIdeology.name !== primaryIdeology && altIdeology.isSecondary()) {
      if (!secondaryIdeologies.includes(altIdeology.name)) {
        // Check if it meets primary conditions for *this* specific alt ideology
        // This check is implicitly handled by `altIdeology.name !== primaryIdeology`
        // because if it were primary for this altIdeology, it would be the primaryIdeology.
        // However, the primaryIdeology might be a *different* one (e.g. Libertarian Socialist)
        // while still meeting secondary conditions for FALGSC.
        secondaryIdeologies.push(altIdeology.name)
      }
    }
  }

  // Ensure existing secondary ideologies are not duplicated if they match new ones
  // This is a simple way to do it for now. A more robust solution might involve
  // unifying the definition of all secondary ideologies.
  const uniqueSecondaryIdeologies = Array.from(new Set(secondaryIdeologies))

  return {
    primaryIdeology,
    description,
    characteristics,
    notableFigures,
    secondaryIdeologies: uniqueSecondaryIdeologies,
    modernContext,
    color,
  }
}
