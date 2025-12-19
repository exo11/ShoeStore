import bannerJpg from '@img/banner.jpg'

function Banner() {

  return (
    <div className="banner">
      <img src={bannerJpg} className="img-fluid" alt="К весне готовы!"></img>
      <h2 className="banner-header">К весне готовы!</h2>
    </div>
  )

}

export default Banner