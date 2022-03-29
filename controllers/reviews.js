import { Review } from '../models/review.js'
import { Profile } from '../models/profile.js'
import { Brewery } from '../models/brewery.js'

function index(req, res) {
  console.log("See these reviews")
  Review.find({})
  .populate("owner", "brewery")
  .then(reviews => {
    res.json(reviews)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function create (req, res) {
  console.log("Create function: sanity check")
  req.body.owner = req.user.profile
  console.log("owner:", req.body.owner)
  // req.body.brewery = req.brewery.id
  console.log("brewery id:", req.body)
  Review.create(req.body)
  .then(review => {
    console.log(review)
    review.populate("owner")
    .then(populatedReview => {
      console.log(populatedReview)
      res.status(201).json(populatedReview)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
  // Brewery.findyById(req.brewery.id)
  // .then(brewery => {
  //   brewery.reviews.push(req.body)
  //   brewery.save()
  //   .then(updatedBrewery => {
  //     res.json(updatedBrewery)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.status(500).json(err)
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.status(500).json(err)
  // })
  // Profile.findById(req.user.profile)
  // .then(profile => {
  //   profile.reviews.push(req.body)
  //   profile.save()
  //   .then(updatedProfile => {
  //     res.json(updatedProfile)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     res.status(500).json(err)
  //   })
  // })
  // .catch(err => {
  //   console.log(err)
  //   res.status(500).json(err)
  // })
}
function update (req, res) {
  console.log("Update a review")
}

function deleteReview (req, res) {
  console.log("Delete this review")
}


export {
  index,
  create,
  update,
  deleteReview as delete,
}