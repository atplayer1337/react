
const bisData = require('../models/bismodel')
const falsData = require('../models/falsmodel')
const newraphsData = require('../models/newraphsmodel')
const secantsData = require('../models/secantsmodel')
const onesData = require('../models/onesmodel')
const diffsData = require('../models/differentiation')
const integrationsData = require('../models/integrations')

getBis = async (req, res) => {
    await bisData.find({}, (err, bis) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!bis.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: bis })
    }).catch(err => console.log(err))
}

getFals = async (req, res) => {
    await falsData.find({}, (err, fals) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!fals.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: fals })
    }).catch(err => console.log(err))
}
getNewraphs = async (req, res) => {
    await newraphsData.find({}, (err, newraphs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!newraphs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: newraphs })
    }).catch(err => console.log(err))
}
getSecants = async (req, res) => {
    await secantsData.find({}, (err, secants) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!secants.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: secants })
    }).catch(err => console.log(err))
}
getOnes = async (req, res) => {
    await onesData.find({}, (err, ones) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!ones.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: ones })
    }).catch(err => console.log(err))
}
getDiffs = async (req, res) => {
    await diffsData.find({}, (err, diffs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!diffs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: diffs })
    }).catch(err => console.log(err))
}
getIntegrations = async (req, res) => {
    await integrationsData.find({}, (err, integrations) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!integrations.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: integrations })
    }).catch(err => console.log(err))
}

module.exports = {
    getBis,
    getFals,
    getNewraphs,
    getSecants,
    getOnes,
    getDiffs,
    getIntegrations
}