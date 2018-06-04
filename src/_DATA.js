let users = {
    aragorn: {
      id: 'aragorn',
      name: 'Aragorn Son of Arathorn',
      avatarURL: 'https://vignette.wikia.nocookie.net/ppc/images/8/83/Aragorn.jpg/revision/latest?cb=20110207220747',
      answers: {
        "8xf0y6ziyjabvozdd253nd": 'optionOne',
        "6ni6ok3ym7mf1p33lnez": 'optionOne',
        "am8ehyc8byjqgar0jgpub9": 'optionTwo',
        "loxhs1bqm25b708cmbf3g": 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    gandalf: {
      id: 'gandalf',
      name: 'Gandalf the White',
      avatarURL: 'https://static.comicvine.com/uploads/original/11123/111235159/5682581-2286688603-mk20D.jpg',
      answers: {
        "vthrdm985a262al8qx3do": 'optionOne',
        "xj352vofupe1dqz9emx13r": 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    legolas: {
      id: 'legolas',
      name: 'Legolas',
      avatarURL: 'https://vignette.wikia.nocookie.net/thehobbitfilm/images/7/77/Legolas.png/revision/latest?cb=20160606192421',
      answers: {
        "xj352vofupe1dqz9emx13r": 'optionOne',
        "vthrdm985a262al8qx3do": 'optionTwo',
        "6ni6ok3ym7mf1p33lnez": 'optionOne'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    }
  }
  
  let questions = {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'aragorn',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['aragorn'],
        text: 'have horrible short term memory',
      },
      optionTwo: {
        votes: [],
        text: 'have horrible long term memory'
      }
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'legolas',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'become a superhero',
      },
      optionTwo: {
        votes: ['legolas', 'aragorn'],
        text: 'become a supervillian'
      }
    },
    "am8ehyc8byjqgar0jgpub9": {
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'aragorn',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'be telekinetic',
      },
      optionTwo: {
        votes: ['aragorn'],
        text: 'be telepathic'
      }
    },
    "loxhs1bqm25b708cmbf3g": {
      id: 'loxhs1bqm25b708cmbf3g',
      author: 'gandalf',
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
        text: 'be a front-end developer',
      },
      optionTwo: {
        votes: ['aragorn'],
        text: 'be a back-end developer'
      }
    },
    "vthrdm985a262al8qx3do": {
      id: 'vthrdm985a262al8qx3do',
      author: 'gandalf',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['gandalf'],
        text: 'find $50 yourself',
      },
      optionTwo: {
        votes: ['legolas'],
        text: 'have your best friend find $500'
      }
    },
    "xj352vofupe1dqz9emx13r": {
      id: 'xj352vofupe1dqz9emx13r',
      author: 'legolas',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['legolas'],
        text: 'write JavaScript',
      },
      optionTwo: {
        votes: ['gandalf'],
        text: 'write Swift'
      }
    },
  }
  
  function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
  export function _getUsers () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...users}), 1000)
    })
  }
  
  export function _getQuestions () {
    return new Promise((res, rej) => {
      setTimeout(() => res({...questions}), 1000)
    })
  }
  
  function formatQuestion ({ optionOneText, optionTwoText, author }) {
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText,
      },
      optionTwo: {
        votes: [],
        text: optionTwoText,
      }
    }
  }
  
  export function _saveQuestion (question) {
    return new Promise((res, rej) => {
      const authedUser = question.author;
      const formattedQuestion = formatQuestion(question);
  
      setTimeout(() => {
        questions = {
          ...questions,
          [formattedQuestion.id]: formattedQuestion
        }
        
        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            questions: users[authedUser].questions.concat([formattedQuestion.id])
          }
        }
  
        res(formattedQuestion)
      }, 1000)
    })
  }
  
  export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        users = {
          ...users,
          [authedUser]: {
            ...users[authedUser],
            answers: {
              ...users[authedUser].answers,
              [qid]: answer
            }
          }
        }
  
        questions = {
          ...questions,
          [qid]: {
            ...questions[qid],
            [answer]: {
              ...questions[qid][answer],
              votes: questions[qid][answer].votes.concat([authedUser])
            }
          }
        }
  
        res()
      }, 500)
    })
  }