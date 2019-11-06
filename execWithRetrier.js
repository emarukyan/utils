// Util Part
/**
* Promise each with start, continue, and pause functionality
*/
const execWithRetrier = (fns) => (onComplete, onFail) => {
    let i = 0
    let _isStopped = false

    const _continue = () => {
        _isStopped = false
        fns[i](_continue).then(() => {
            if (_isStopped === false) {
                i++
                if (i >= fns.length) {
                    onComplete()
                } else {
                    _continue()
                }
            }
        }).catch(onFail)
    }

    const _pause = () => {
        _isStopped = true
    }

    _continue()

    return {
        _pause,
        _continue
    }
}

const f1 = (_continue) => {
    return loginUserWithXyz()
        .then(dsasdas)
        .catch(err => {
            showLoginPopup(_continue)
            return Promise.reject()
        })
}

/// Exec Part
let _continue = null

const onFail = () => {}
const onComplete = () => {}

const fns = [f1, f2, f3, f4]

execWithRetrier(fns)(onFail, onComplete)
