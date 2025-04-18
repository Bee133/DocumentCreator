const Router = require("express").Router;
const ProductController = require('../controllers/product-controller');
const OrgatizationController = require('../controllers/organization-controller');
const IndividualController = require('../controllers/individual-controller');
const ProxyBodyController = require('../controllers/proxy-body-controller');
const ProxyHeaderController = require('../controllers/proxy-header-controller');
const AdrepBodyController = require('../controllers/adrep-body-controller');
const AdrepHeaderController = require('../controllers/adrep-header-controller');

const router = new Router();

router.get
    (
        '/products',
        ProductController.getAllRecords,
    );

router.post
    (
        '/products',
        ProductController.createRecord,
    );

router.put
    (
        '/products',
        ProductController.updateRecord,
    );

router.delete
    (
        '/products/:id',
        ProductController.removeRecord,
    );

router.get
    (
        '/organizations',
        OrgatizationController.getAllRecords,
    );

router.post
    (
        '/organizations',
        OrgatizationController.createRecord,
    );

router.put
    (
        '/organizations',
        OrgatizationController.updateRecord,
    );

router.delete
    (
        '/organizations/:id',
        OrgatizationController.removeRecord,
    );

router.get
    (
        '/individuals',
        IndividualController.getAllRecords,
    );

router.post
    (
        '/individuals',
        IndividualController.createRecord,
    );

router.put
    (
        '/individuals',
        IndividualController.updateRecord,
    );

router.delete
    (
        '/individuals/:id',
        IndividualController.removeRecord,
    );

router.get
    (
        '/proxy-bodies/:headerId',
        ProxyBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/proxy-bodies',
        ProxyBodyController.createRecord,
    );

router.put
    (
        '/proxy-bodies',
        ProxyBodyController.updateRecord,
    );

router.delete
    (
        '/proxy-bodies/:id',
        ProxyBodyController.removeRecord,
    );

router.get
    (
        '/proxy-headers',
        ProxyHeaderController.getAllRecords,
    );

router.get
    (
        '/proxy-headers/:id',
        ProxyHeaderController.getOneRecord,
    );

router.post
    (
        '/proxy-headers',
        ProxyHeaderController.createRecord,
    );

router.put
    (
        '/proxy-headers',
        ProxyHeaderController.updateRecord,
    );

router.delete
    (
        '/proxy-headers/:id',
        ProxyHeaderController.removeRecord,
    );


router.get
    (
        '/adrep-bodies/:headerId',
        AdrepBodyController.getAllHeadersRecords,
    );

router.post
    (
        '/adrep-bodies',
        AdrepBodyController.createRecord,
    );

router.put
    (
        '/adrep-bodies',
        AdrepBodyController.updateRecord,
    );

router.delete
    (
        '/adrep-bodies/:id',
        AdrepBodyController.removeRecord,
    );

router.get
    (
        '/adrep-headers',
        AdrepHeaderController.getAllRecords,
    );

router.get
    (
        '/adrep-headers/:id',
        AdrepHeaderController.getOneRecord,
    );

router.post
    (
        '/adrep-headers',
        AdrepHeaderController.createRecord,
    );

router.put
    (
        '/adrep-headers',
        AdrepHeaderController.updateRecord,
    );

router.delete
    (
        '/adrep-headers/:id',
        AdrepHeaderController.removeRecord,
    );

module.exports = router;