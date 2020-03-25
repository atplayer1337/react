const express = require('express')

const DataCtrl = require('../controllers/ctrl')

const router = express.Router()

router.get('/bis', DataCtrl.getBis)
router.get('/fals', DataCtrl.getFals)
router.get('/newraphs', DataCtrl.getNewraphs)
router.get('/secants', DataCtrl.getSecants)
router.get('/ones', DataCtrl.getOnes)
router.get('/diffs', DataCtrl.getDiffs)
router.get('/integrations', DataCtrl.getIntegrations)

module.exports = router