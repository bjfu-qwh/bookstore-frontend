import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export const startProgressBar = () => {
    NProgress.start();
}

export const endProgressBar = () => {
    NProgress.done();
}