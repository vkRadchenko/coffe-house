import products from '../mock/products.json' 

const shadow__overlay = document.querySelector('.shadow__overlay')
const modalPortal = document.querySelector('.modal__portal')
const menu = document.querySelector('.menu')
const menuProducts = document.querySelector('.menu__products')
const menuTabs = document.querySelector('.menu__tabs')
const menuTabsActive = document.querySelectorAll('.tab__item')

const btnLoadProduct = document.createElement('div')
btnLoadProduct.className = 'btnLoadProduct'
menu.append(btnLoadProduct)

const desktopWidth = 1024
let stateCategory = 'coffee'

let isDesktop = true
if (window.innerWidth < desktopWidth) {
  isDesktop = false
}
renderProducts(products, 'coffee', !isDesktop)

window.addEventListener('resize', () => {
  if (isDesktop && window.innerWidth < desktopWidth) {
    isDesktop = false
    menuProducts.innerHTML = ''
    renderProducts(products, stateCategory, true)
    btnLoadProduct.style.display = 'block'
  }

  if (!isDesktop && window.innerWidth >= desktopWidth) {
    isDesktop = true
    menuProducts.innerHTML = ''
    renderProducts(products, stateCategory, false)
    btnLoadProduct.style.display = 'none'
  }
})

/* if (isDesktop) {
} else {
} */

menuTabs.addEventListener('click', (event) => {
  menuTabsActive.forEach((tab) => {
    tab.classList.remove('active')
  })

  if (event.target.classList.contains('tab__item')) {
    btnLoadProduct.style.display = 'block'
    event.target.classList.add('active')
    let categoryProduct = event.target.id
    stateCategory = categoryProduct
    if (categoryProduct === 'tea') {
      btnLoadProduct.style.display = 'none'
    }
    menuProducts.innerHTML = ''

    if (isDesktop) {
      renderProducts(products, categoryProduct, false)
    } else {
      renderProducts(products, categoryProduct, true)
    }
  }
})

btnLoadProduct.addEventListener('click', (event) => {
  menuProducts.innerHTML = ''
  renderProducts(products, stateCategory, false)
  btnLoadProduct.style.display = 'none'
})

function renderProducts(products, category, crop) {
  let renderProductCount = crop ? [0, 4] : [0, 8]
  products
    .filter((item) => item.category === category)
    .slice(renderProductCount[0], renderProductCount[1])
    .map((item) => {
      const productItem = document.createElement('div')
      productItem.className = 'menu__products_item'
      productItem.id = item.name
      productItem.innerHTML = `
    <div class="item__box_img">
        <img src="../assets/${item.image}" alt="cofe_item">
    </div>
    <div class="item__description">
        <div class="description__item_title">
            <h3>${item.name}</h3>
            <p>
               ${item.description}
            </p>
        </div>
        <h3>$${item.price}</h3>
    </div>`
      menuProducts.append(productItem)
    })
}

menuProducts.addEventListener('click', (event) => {
  if (event.target.classList.contains('menu__products_item')) {
    const idProd = event.target.id
    document.body.classList.add('noSmyth')
    modalPortal.classList.add('show')
    shadow__overlay.classList.add('show')
    renderProductModal(products, idProd)
  }
})

shadow__overlay.addEventListener('click', (event) => {
  shadow__overlay.classList.remove('show')
  modalPortal.classList.remove('show')
  document.body.classList.remove('noSmyth')
  modalPortal.innerHTML = ''
})
let additivesPrice = 0
let sizePrice = 0
modalPortal.addEventListener('click', (event) => {
  const nameProduct = document.querySelector('.description__item_title')
    .childNodes[1].textContent
  const totalPrice = document.querySelector('.totalPrice')
  const btnSize = document.querySelectorAll('.size__btn')

  if (event.target.classList.contains('modalProduct__item_btn')) {
    shadow__overlay.classList.remove('show')
    modalPortal.classList.remove('show')
    document.body.classList.remove('noSmyth')
    modalPortal.innerHTML = ''
  }

  if (event.target.classList.contains('modalProduct__btn')) {
    if (event.target.classList.contains('size__btn')) {
      btnSize.forEach((tab) => {
        tab.classList.remove('active')
      })
      event.target.classList.add('active')
    }

    if (event.target.classList.contains('size__btn_m')) {
      sizePrice = 0.5
    } else if (event.target.classList.contains('size__btn_l')) {
      sizePrice = 1.0
    } else if (event.target.classList.contains('size__btn_s')) {
      sizePrice = 0.0
    }

    if (event.target.classList.contains('additives__btn')) {
      additivesPrice += 0.5
      if (event.target.classList.contains('active')) {
        additivesPrice -= 1
      }
      event.target.classList.toggle('active')
    }

    const summ = products.find((item) => item.name === nameProduct).price
    let finalSumm = sizePrice + Number(summ) + additivesPrice
    console.log(sizePrice, additivesPrice)
    console.log(finalSumm)
    totalPrice.textContent = `$${finalSumm}`
  }
})

function renderProductModal(products, id) {
  const targetProd = products.find((item) => item.name === id)
  const productDetal = document.createElement('div')
  productDetal.className = 'modalProduct'
  productDetal.innerHTML = `   
  <div class="item__box_img">
    <img src="../assets/${targetProd.image}" alt="cofe_item" />
  </div>
  <div class="modalProduct__box_about">
    <div class="description__item_title">
      <h3>${targetProd.name}</h3>
      <p>
      ${targetProd.description}
      </p>
    </div>
    <div class="wrap__modal_btn">
      <div class="modalProduct__box_size">
        <span>Size</span>
        <div class="size__box_btn">
          <div class="modalProduct__btn size__btn_s tab__item size__btn active">
          <span>${targetProd.sizes.s.size}
          </span>
          </div>
          <div class="modalProduct__btn size__btn_m tab__item size__btn"><span>${targetProd.sizes.m.size}
          </span></div>
          <div class="modalProduct__btn size__btn_l tab__item size__btn"><span>${targetProd.sizes.l.size}
          </span></div>
        </div>
      </div>
      <div class="modalProduct__item_additives">
        <span>Additives</span>
        <div class="size__box_btn">
        
        <div class="modalProduct__btn additives__btn_1 tab__item additives__btn"><span>${targetProd.additives[0].name}</span></div>
        <div class="modalProduct__btn additives__btn_2 tab__item additives__btn"><span>${targetProd.additives[1].name}</span></div>
        <div class="modalProduct__btn additives__btn_3 tab__item additives__btn"><span>${targetProd.additives[2].name}</span></div>
    </div>
  </div>
    </div>
    <div class="modalProduct__item_price">
      <h3>Total:</h3>
      <h3 class="totalPrice">$${targetProd.price}</h3>
    </div>
    <div class="modalProduct__item_info">
      <p>
      The cost is not final. Download our mobile app see the final price and place you order. Earn loyalty points and enjoy you favorite coffee with up to 20% discount
      </p>
      <button class="modalProduct__item_btn tab__item ">Close</button>
    </div>
  </div>
  `

  modalPortal.append(productDetal)
}

function renderModalButton(prod) {
  prod.map((item) => {
    item.additives
  })
}
