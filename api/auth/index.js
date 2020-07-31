const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express()
const users = require('../../config/users.js')
const tokenSecrets = require('../../config/tokenSecrets.js')

const refreshTokens = []
app.use(bodyParser.json())

app.post('/login', function (req, res) {
  const { email, password } = req.body
  const user = users.find((u) => {
    return u.email === email && u.password === password
  })
  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { email: user.email, role: user.role, expiresIn: '1m' },
      tokenSecrets.access
    )
    const refreshToken = jwt.sign(
      { email: user.email, role: user.role },
      tokenSecrets.refresh
    )
    refreshTokens.push(refreshToken)

    res.json({
      accessToken,
      refreshToken,
    })
  } else {
    res.status(401)
    res.send('email or password incorrect')
  }
})

app.post('/token', function (req, res) {
  const { token } = req.body

  if (!token) {
    return res.sendStatus(401)
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403)
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }

    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: '1m' }
    )

    res.json({
      accessToken,
    })
  })
})
app.post('/logout', (req, res) => {
  const { token } = req.body
  refreshTokens = refreshTokens.filter((token) => t !== token)

  res.send('Logout successful')
})
module.exports = {
  path: '/api/auth',
  handler: app,
}
