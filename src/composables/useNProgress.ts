import NProgress from 'nprogress'

const ensureProgress = () => {
  if (!NProgress.isStarted()) {
    NProgress.start()
  }
}

export const useNProgress = () => {
  const start = () => {
    ensureProgress()
  }

  const done = () => {
    NProgress.done()
  }

  const wrap = async <T>(task: () => Promise<T>) => {
    ensureProgress()

    try {
      return await task()
    } finally {
      NProgress.done()
    }
  }

  return { start, done, wrap }
}
