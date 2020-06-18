let fortunes = [
    'Immanentize the Eschaton',
    'To be played at the Maximum Volume',
    'Two men enter, one man leave',
    'Lattice of Coincidence',
    'Speak in images, not antiquated verbosity',
]

exports.getFortune = function () {
    let idx = Math.floor(Math.random() * fortunes.length)
    return fortunes[idx]
}
