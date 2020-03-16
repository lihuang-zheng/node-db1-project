const express = require("express")

const db = require("../data/dbConfig")

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({error: 'Failed to retrieve accounts.'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const [account] = await db('accounts').where('id', req.params.id);
        res.status(200).json(account);
    } catch {
        res.status(500).json({error: 'Failed to get account.'})
    }
})

router.post('/', async (req, res) => {
    try {
        const account = await db('accounts').insert(req.body);
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({error: 'Failed to post account.'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const accountUpdate = await db('accounts')
            .where('id', req.params.id)
            .update(req.body);
        res.status(200).json({updated: accountUpdate});
    } catch {
        res.status(500).json({error: 'Failed to update account.'})
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const accountDeleted = await db('accounts')
            .where('id', req.params.id)
            .del();
        res.status(200).end()
    } catch (err) {
        res.status(500).json({error: 'Failed to delete account.'})
    }
})

router.get('/sorted/accounts', async (req, res) => {
    const {limit, sortby, sortdir} = req.body;

    try {
        const accountsOrder = await db('accounts')
            .orderBy(sortby, sortdir)
            .limit(limit);
        res.status(200).json(accountsOrder);
    } catch (err) {
        res.status(500).json({error: 'Failed to retrieve accounts.'})
    }
})

module.exports = router;