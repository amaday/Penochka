/**
 * penochka. internationalization
 */

var i18n = {}

var i18nButtons = {
   text: {
      begin: ' <b>[',
      end: ']</b>',
      sep: ' / ',
      bold: '<b>Ж</b>',
      italic: '<em>К</em>',
      striked: '<s>З</s>',
      underline: '<u>П</u>',
      capsBold: '<b>КБ</b>',
      spoiler: '<span class="spoiler">SP</span>',
      source: '<tt>Код</tt>',
      sage: 'Сажа'
   },
   photon: {
      begin: '',
      end: '',
      sep: '',
      bold: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4YMTJtWtkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEjklEQVRIx7WWzWtUVxjGf2cyY0ZH0YQJxsQQE5xCkdBRO2kiokQ3WWWR7PwDjAUx6Epm4aodKqIQNKgoNYt2IX7gwoVS2nRnqVn4lYxSKZXW+NGQimPM3Ln3vG8X987N3CS70guHe+85nPOc932e98MQPHomXQ9sBur5748D/GWOzToApgagh/Z9P/Ph5bIdqooqKArq/1fnwV9bfIObbGLt7K99wD1zbNYxAUAvm3dN8PYxrE5DXWIRoHpYCKIEZ0b/AxAjLnWVd5TXZUj986APuBcH2mjvm+DVJDR1QfcRWNsCGBTF8yzWelixWE9Q8fCsImKxVrBWEBFEPVSU+MJrGp5/R7L0G6XGzyfWzU1m4kA9H2Z8C7qPwOZdUJcEQKyLuhZrLZ7nhW8RwVobDhHBqgURyvXN2A6huThKwvkboD4WeATiq2Btqw9gDKIWzyqugBVBg4EaUOO7sWagBhVQk8BNptFYonoy8ZWkIeLhutVbVm+qwbDYYE5EUNXwW9SAKiIm5BMgFjlc4eTJb0il1pHL5Xj6tIiI0NDQQDqdZuPGjbS0tNDW1kZ7ezudnZ2oKs+ePWNgYIAdO7J8Oz4eqpGlIKpgxfLV1wUcxyGfz3Pw4DDWWmZmZrhx82bE2mvXrlIsFrGqHD9+nJGRERzH4fz58zU21IBooH3PenR359izZw/9/f00NTVx584dTJ3hi56eyMbt23cSi8X44e5dNm3aRN/eveRyObq6upAohs9JGFSe5daNW3jq85HP5xkeHmb37t0YY5bwJriuy+joKGdOn0aAy5cvIyLw4Y+aKKtaEgSSZy2udRHPl+jWT7aSyWQoFArMl0oRkI8fP3Lu3DkymQwdnZ1RIRDBCDhR9YGs5wOoi7UW13FpbW3l4sWLfLptWwQkm81y4cIFmpubqVQqCBIQriASXH0JJyhYq3hSDTZlbGwsIBJOnDgRAcnn8wBcuXKFS5cuoaqYAERVI9THajKUHwPW4nnCq1cvOXv2LADpdJrBwcEIyMDAABs2bABgfHyct6/fhm5SogKrURdBLvKBTp06xcLCAgCHDx9mdX20AqRSKQ59eQiAcrnM2NhYGJiqK0jYz6AaRveTJ0+4fv06AB0dHQwNDfluXqKuocEhtmzZAsDt27cpFosrFpdFTvA5efPmDfl8PrzN0aNHAXj4+GFk49TUFMYYRkZGwtpSKBSYm5vzc9zSOCEsRpbe3t7Qndlslv3797NtibIADhw4AMDk5CS5XI779+9TLBbp7+/nwY9XIxqO11oiIkxPT6MxQAi1/+jRo4i/VU1gqb9e5SMc8y8izIe5y0iFuvnXYB0I6kP14CqgqmKMYowNARbLcxAjtkLCmcWIG3FXxU2mWf1umsbfv8eq4tanqQvymQSmxoMgE8CoYmvrfwgmrHJmaZ25QcJ7TymVYc3Cn47RM+kk0DPf8NlEsvQcL7HeLzhVnpZ3FUH/ocDydSMuCe8982s6WF+a6gN+qXYrSaC31Ljzp4QzG5K0HCA6u+IFjMFJNNLw/uG+oFspm5q+K/k/9F1lgH8Bw4whn+9+4KQAAAAASUVORK5CYII=" alt="Жирный" style="vertical-align: middle !important; border: none !important" />',
      italic: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4bEFUpGUQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEVklEQVRIx7WWT2hUVxTGfzeZScYxooYnSLSIi8mitAyNf6oxi07cuAriMtJko3Un6Mp1dlUQupCQjRRicaHduSmKiYg1VRctxVYwhgRTx9rQSP44mbx7zuni3XmZSdJV6WMu7+/c75zv++65xxEOuxq1AnuBVv77UQVm3cW5KoCrAzjCvt5xlv7Y8A8zwwwMA0vua88hebd2hji3i7a5JyXgsbs4V3UB4Ch7u8d49ytsiaA5uwZQmywFMcKcjfcBxGlM8+p7VrYV2Dr/cwl4nAE+Yl9pjPIz2PUpHD4PbR2AwzC8F0Q8ooJ4xdTjxVAVRBQRRVVR85gamcpbdk7eILf4ksX2g2Pb/n5WyACtLL1JMjh8HvZ2Q3MOAJUYiwURwXufnlUVEUmHqiImoMpK625kv7L792/IVv8CaG0KjECmBdr2JADOoSZ4MWIFUcXCwByYS2isG5jDFMxliXMR1pStzUxmM2uoeuK4FmUtUgtDkPBMVTGz9FrNgRmqLtUToKlhcgOJ4xTATCiXy1y+fJkoiujo6ODKlSs8ffoTCsQiXLp0iWKxyLlz5zATtM6NrAcxA1HB1/HtvRJFEWfPngXg1KlTXLhwgQOfHQD1fHv9Ol+UShw/fpzZ2dk0q7Uc6uiy4H0vHvUeqaUfAB/9+AiAvpMnE4oUFpaWePHiBQMDA/SWSqj3qFkC1IhRAwmLygvqE6fUAFSVe3fvkc/n+fzQocC9MjIywuDgYEKNCOZcYo4k4rpVVgMJK9mL4CXGlERgE1SU8fFxeo4dI5PJoKrcunWLXC5HZ2dnkhk0GoEGjKCJGYZh4kMmcZKFV6amppiZmeHPd+/o6+uj+1g3La0tnPnqTBA4uAtN7wm62HpNAEQMrx6cIQJmyv2x+wAMDw8zPT1Nf38/09PToMFFbq2OObNUl3pZmuoqVEJRcJWqx8R4MP6AQqFAFEV0dXVR6i1xY/QGlUolZJFQRfJbY2m9hWtaJbVorVx8+PCBiYkJenp6sGCCLwcGmZ+f586dO4hJInot+kCdWaO90kySDxpdNfHkCZVKhe7u7jTig10HKRQ6GR0dxcQ2AGx2NK3XZK3gGXfv/gBAsVhMojbDTDh9up/JyUkePny4AcDMkhq3qSZhAlXl1atXjAwPc/v2bQCuXbtGuVxOqThx4gQ7duxgaGiImzdvsrq6Wre51VOVXDu7Gn1cbdv/HKDcNcRKfh/WRCKk6qZ8m7kwmTZmEEZueYbOl18DkK+8/iStXU5XaV5+C1KFsD+kNNQBOmc4J/8KgKySrc7hNG4oK6txLmLL+99on/oOMSNujWgO9UyDaJmwyBRwZkj9/p+CKS3VOfa8+Z6sX2Bxa4F85XXV2dUoBxxZ3lkcyy1O4rPbkw2n1jRs7CpC/2HAxvdOY7J+geX8frYvPi8BE7VuJQccXWw/cD9bnUvtthGg8emmAThHNdvOzoVfekO3suLq+q7c/9B3rQD8A268xe7YpkfWAAAAAElFTkSuQmCC" alt="Курсив" style="vertical-align: middle !important; border: none !important" />',
      striked: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4lKUvpijEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEH0lEQVRIx7WWT2hURxzHP5Psy64ao2ZXSJotxoO5lSItQSUI8eYtl6Citzb2JkQvekiQUnMUCubiuUUQejGHxktTpGgsEVpKm0MTZWk10m5qmkTN7pvf79fDm327m82llA4Mw3tvd77z/TMzP0dodrOQBYpAlv/eKsDv7nK5AuAaAI5x6NS3bD5v+YeZYQaGgSXPtfeQfKuPEOcO0ln+fhh45C6XKy4AHKd4Yo4/foJdBWiP6gC1yVIQI8zZ/BxAnMa0V9fY2nuEPa9+GAYeZYB3OTQ8x8oCHHwPBi9B5zuAwzC8F0Q8ooJ4xdTjxVAVRBQRRVVR85gambcvObD0BbmNX9no/nBu718LRzJAls0XCYPBS1A8Ae05AFRiLBZEBO99OqoqIpJ2VUVMQJWtbA9yWOlZ/Jyo8idAti0oApkO6OxLAJxDTfBixAqiioWOOTCXyNjQMYcpmIuIcwWsLarNTGanaKh64sCgs3MP09PTLC8vMzMzQ6lUYv/+/YyMjDA+Pk4URYlcqqg5MEPVpX4CtDVNbiBxnAKYCQDj4+P09/dz//7XPH78mKGhIW7fvs3E5GRIXq0L2pBGtoOYgajgG/T2XlOQ0TNn6OjIkc/n+fT6dQBm7t1DmkAMVW3g0CCXhex78aj3SI2+JiCjZ0YTgwFV5dmzEgC9vb2YSBJx1TpQM0YNJGwqL6hPklJL0MrKSsKqWmV1dZWHDx8yNTVFPp/nxo0bycTSKFOyd2hwJRO2ERh4EbzEmIKYJGBhH/T396crGxgYYHp6mr6+PlQVCww1sFGaMIInZhiGiQ9M4kQeX5dtcXGR2dlZLn5ykaWlJc6ePUupVEp9UOpyEXyx7Z4AiBhePTjDOagWi+nqs8AAcDV0Vlfh9Okm7f9+8gSthYCWdCWeiNVT9ba3718du7tWnqcyGc0B28YkMdsAnj6F4I2qgioS9H6zucng4CDZbJb5+XnMjFcvXqbSmTXHK2WS/KCeKlXlo7GPuXPnTvAlmOuVBw++A+Do0aM77JHW1uJJjYkC165d5cKFCywvL3P+/HkKhQILCwtMTX1GV1cXV65caQEws+SM2w5CehlJUySLxSJ3797l1q1bnDt3jrW1NfL5PCdPnmRsbIyenp5WgCaprJVJTSoLZ7Oqks/nmZycZGJiItXbzIVRWwDqQNZ6djmt0v76JUglmCz1VQY/zAznDOcE2BkAqRJVyjiNm+SqxrkCu9Z+ofvpl4gZcbZAezjPNFDNhE2mgDNDGu//FEzpqJTpe/EVkV9nY88Rdr/9reLsZiEHHHt94P253MYSPtqXXDg1n1qrilB/GND63WlM5Nd5vfsw+zZ+Hgbma9VKDji+0f3BN1GlnJrUCtD8dscFOEcl6ubA+o+nQrWy5Rrqrtz/UHdtAfwDZfV5VijJQF8AAAAASUVORK5CYII=" alt="Зачеркнутый" style="vertical-align: middle !important; border: none !important" />',
      underline: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4lDXfqbuAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADw0lEQVRIx7WWTWubRxDHfxtL0eM3go0CpnGxU3AKxaGH2sZOenGu/gD+Fj7k5nNfoBdBae6GoBz7EWr3Jtv40NLGhTYUY7Vp2oo2WLZsSTszPew+L6p8SunCw8PusvOf+c9/ZtcRh9WqFWAWqPDfRxf4xT1udQFcAWCVuUdfc/7r0AkzwwwMAwvzdB3CXv6HfnKbidbhOtBwj1tdFwHWmH2wxx/fwWgVRso5QGosAzGizcF5BHHaZ6T3mqvJBcb//mYdaJSAt5lb3+O3I7h9H1a2YOItwGEY3gsiHlFBvGLq8WKoCiKKiKKqqHlMjdLlK6Ze1EnaP9GeXtqb/OtooQRUOH8ZIljZgtkHMJIAoNLH+oKI4L3P/qqKiGSfqiImoMpVZQa5q8z88Dnl7p8AlVJkBEo3YeJOAHCO3d2vqNefsbOzw/z8PGurq6hZRp2acnBwQLPZZHNzk42NDVaWljBXpp9UsRvl1DKl66Sh6nn48EMWF++zs7PD8vIyXzx5MuT91tYWzWaT7e1tKpUKooAZqi7L5xCIGli/jzdDRBgfH81UJCKYBeOgaMFIkiSoKmaaCSVV2gCIGYhGfiPnwWA4pID4kGSTAERByukXztgAM6UUwMzw4lHvEY2KSUEIkSgEEAVJ85NKXDUHGsRIQWJReUF9UEqqIABTQ6OqglxjRClIdMAyYVihylKQWMleBC/96KkEWaaHRdBIRzFKAnHZWkptMfOlNCEGmHjUK+oEERvIiUQAMcGwmPpUjYqS00XMi/07JwAihlcPzhABM80cyjwlgmvew1JHnFlWS8aQusKSWKiB1GjmbJEmwvoAXaqhQIss2TXqCpHoAEjnvANAp9PJcxKsYmZ0Ovl+kiSZhIsRAtwg66Ch6aWqajQafPTJxwA0Gg2ePq1zcnKCeuX0tEm9Xufw8BCAWq3G0dHRQHTF4axWfa83+c5zgN+XPqU3MRciidIsFllebGTzwSIMuamcn7Dw42cAjF2eLuY5MfK24Rzv3rv3Rlfi/v5+8brL6YqNNaPq3hsCNBqNXMaFzGe9y2mPkYtXUJnh+Ph7xCxTkTMX6sMM51J6GKAoMy49yt0WTvuh3UeQXj+pMvr6mOmfnyFm9CtVRixvjJhRikWmgDNDivd/Bqbc7La48/JLyv6M9vgCY5fNrrNaNQFWL6be30vaL/DlW9GD9F4felXE94cBw/tO+5T9GRdjd7nVfr4O7KevlQRYa09/sFvutvIWPgQwuHqtA87RLU8zdfbto/hauXKFd1fyP7y7rgD+AXdedl2Vuy8jAAAAAElFTkSuQmCC" alt="Подчеркнутый" style="vertical-align: middle !important; border: none !important" />',
      capsBold: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw45NbmfiyMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAFHUlEQVRIx72Xz08VVxTHP/OYBw+RCOSZWHgEsb640WoCMeBKMP0bdGHiwh+JoZHAvooFTXVBbCILE5cllkVj0DSxC0tZ0TQaWmuLvzctSgopRMTHY+49p4uZN2/eD7XFtDc5mcy9M+d+77nn+z33OgRNh5NVQAqo4r9tH76h/ymQBf5w+heyAE4EWAct3d/zarbkL1VFFRQF9d/fp/n/+z7zT/ASm9m48GMXMOX0L2SdAFgnqX0T/PkLVCehIp53lHMWglPeC1qJHx+cIx4Va0us1qapWfypC5hygWZauiZ4cQc274K9p2BjI+CgKMZYrDVYsVgjqBiMXT88EYu1grWCiCBqUFHczBz1T74ksfyY5Yb2idq/7qRdoIpXz/2I7T0FqX1QkfAdWQ/1LNZajDHhU0TWDc5aG5qIYNWCCKtVW7CtwpaZL4hn5wGq3GDnwK2EjU0+MMdBgggZASuCBoY6vq1/VwsMdVABdeJ4iSQai+cQ4ZYPvcHzLIlEIuwbGxtj//79WLVYsczMzDAwMMD09DSZTIa+vj76+/sBaG5u/kdAp6amqKurQ9QBVUSccAEl4ERBPQ+jirW2CLCg6m/F3NwLDh48yOLiYlFMZF3MVZWQeFEhcPMfgZUgD0RKwQHG+El8buhcCCwWi5FqaqJuUx1iSsGdHxqivb094kewVrGq1NbWBoA0yONCork5YKqKsQYxBitSkvQiggCPHj1i/MYNACorKxn7aow9u/cE35RGprExRTq9I08IzZNBVVFr8wCLRMAtEEVjEeMzqBicWosYw+DgYCjCx44dY9dHu3zGvYmdagvGJVh4DpiE2+lrH5GscwMZBAVjLcZ6qFAy4bOnT7l9+zaTk5MApFIpjh8//k5ZOXr0aD4Srkt9fT07d+7kyJEjtLW1FYAVCrAFOReotVqDGEEciy0S2oGzZwveez7pobqmGvkXJDDGMD8/z8TEBJOTk4yMjNCxryMfuSDvcjPHcjmHgrWKEV9k7TuqwIXPLzA7OxuuPGrRdmbgDOM3xrk+fp3LI5dpbW0Nt/fKlSuoKk4ATotKYywqjblk9VlpCia5evUqvb294fvS0hJ9vX14Wc+nctSihPigkfT2NDvSO+ju6ubkyZPh2MzMDEj+F6WQsLE8WwlqXr68FBBChBMnTtDV3R323bt3j4sXL741cjmZyJnneeFYPB4vkJLi004YOf+DQOdsGbaKP9G5ofO0tLSE/aOjo9y69S0ihBZts7PPefjwMQ8ePOTmzW+4dOlSONbZ2RnRuNIW6pxflP3KUE7rBX9lNTXVDA8Pc/jwYTKZDACnT39KOr2drVu3lkwwOPhZ2YmTySQ9PT0hMFX1a3fZnFMNy5OIIMaU3R5VZdu2bZyNsPf169f09/ezsrLyVmlxXZdUKsWhQ4e4du0ajY2NkRKmRaWwKHK5LdWYP37//v08iyLgVB0OHPiYu3enyxwaKNtfeAqWwohFLMqIsLY6skbFyhxUbQHi2OD0KyI46iDqA3Oc9RX4aA0vBwy7Rjy7gCOef2wKwK15iSTVS7/R8GwUq4pXlaQiqLcSeHQDkRTAeY87hI2eRkKQQmV2gabnXxM3L1muSbMh83vW0eFkAuhYqd89kVh+golvCpDn7g1lls76D5uEN4fC5ohH3LxkZUMrm5Z/7QJ+yN2+EkDnckPbd/HsQpiEWtbv+928yvtVcByy8QbqX/7cHdy+Vp3IvTXxP91bt7+h/0nk3roK8DeW5+knBNwhbQAAAABJRU5ErkJggg==" alt="КАПСБОЛД" style="vertical-align: middle !important; border: none !important" />',
      spoiler: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDxEWFYeXd8sAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC8klEQVRIx8WXzW4URxSFv5rpZhowQrYGyQrjIJR4iVgEIWBnHogFD4KUd0iWeQOEsyOKWICiwALDJgmgZJQgDxZud917sujqnl8WzCTjkko9GnVXf33vuafqBtLQg34PGAA9Pn98Bbxi9VECv4f7wxIgTIDd4srdH/nwx9wTkpBACLT8myVNXOs1x1eoiktsDH/eAx6H+8MyJLDbDO7s8+cvcLYP3Xy8YLNYC7c8XWJp10moSBC8onvynuMLu5z/5+ke8DgDdriyt8/bJ3DpGty8BxtfAAEhYjTMIuaGRUcel4aLJtwNM8fMcXdcEbnIPr5j8+A7itFLRls39i/8/WQ3A3p8eFNH7OY9GNyBbgGAW4Uqw8yIMbbXZYe7Y2btdHdMBu4c97axq872i2/Jy78AelkTbbIzsHG5BgsB90g0ER3MHaWJwgqiC7VMJiYKyEEhpyr6qJO3us4Wf2Hk4cNHrGsMBl+ChHsYa3MWzgWqKuIKol+uiq0tvMlXZ+MbwDzpwL29odPp/G9Qnt4jKf2eDkrWgEkiWsRjnIJbT+RUA84kLJsyxWh4TBV0CnDjnGoCLjl/NCNahdYbONy9jtyUWzeaS24ti3h0PJxS5JLuNKs5ADMRPUJYb7UGCU+AYq5a679MtXOvF402nWK6YGci56cC11iJtMBKmpOBJ5/zNZuwf8K65jQ3Gzlfk+dJqvfuhZpTvY24+6mkdTqlmo9cc6RRB3Z2dlodtA6+QBefBxHS8z61dU3OyYpo99bgJ3SP3kFvG8ixdPp1d4ICrhosrGQznrQ9D4adkJdDglf1sSnBnVRFn7Pvn7P1+ntMour16ab91lNos2SSvqKf2QKNSc6ZcsjlNz+Qx0NG53c59/G3MuhBvwBuHW1e3y9GB8T8YiJv+oa53KyC16ZtdpXgFXk85OjcVS6Oft0Dfmq6rwK4Pdr65lFeDlsAfapDWbUAFn1wCJT5FpuHz+6m7us4TPStxQp969fAwX/Ytx4D/Avt/GC/55FUuAAAAABJRU5ErkJggg==" alt="Спойлер" style="vertical-align: middle !important; border: none !important" />',
      source: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4sN2AkDBsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADvElEQVRIx7WW304bRxTGf+M/sZM4RIAjAqEOpEZG/EmFqKIkd+SBcpEHidR3aC/7CqV3iaogFVm4VmJx4VCKWtNGOCiYnXNOL3Z2vYu5q7rSaGd3dueb833fOTOOcNnregVYBCr892sEHLlXgxGAywA85eGLn/n8+8QfZoYZGAYWPyfvIR4b3yGq3qM2+GUHeONeDUYuADxj8fkuf7bhZh2K5TFAMlkKYoQ5888BxGlE8fITF3dWuP3PrzvAmxLwFQ93dvnjHdzbhCcvobYAOAzDe0HEIyqIV0w9XgxVQUQRUVQVNY+pUfpywnTve6rDDwxnvt298/e7lRJQ4fNxHMGTl7D4HIpVAFQiLBJEBO99eldVRCRtqoqYgCoXlfvIsnL/t+8oj/4CqBQCI1C6AbUHMYBzqAlejEhBVLHQMAfmYhozDXOYgrkyUbWOFcrJzJSus4aqJ4qSVSYrtdAECe9UFTNL+2oOzFB1qZ4AhdzkBhJFKYCZMDU1ldIzNzfHwsICoCigQLPZDO4zzATNuJGrIGYgKvgM37XaFKenp8zOzqLA0dFRvBivoJ7mo0d0379ndXU1BVLVTAwZuix434tHvUdC+AAikt41pRMkyZUwTqDOzNA8RgISksoL6mOnXAXR4CogN54k5pimOHfIqFIIaYQZeBEiiWIgEY5Pjpmfn6ff72MiLC0tQdBBVel0OqytrdFut/NGIIcR3BWy1sSjXlEniMT89vv94Byj1+shJin3ZjYGYEwXQZecuwJbiBhek2SLJ2o0GkiYtNls0lppxVQprK+vs7m5mdLmUpdZTvpCpkLFOSCC94qqp9FocHh4yNfLy6gq3W6XRABVpd1uB81jUM2yZNe4KxY51sKSHzPCmwiaiByoEpNMlbYcjRPuSipokt2acJsBUwW1cd9MMbUcSPLt1auQj8QyBc/odru0Wi06nQ5iwsbGBgCPH2+gqmxtbQGwvb2ds7RdAUsjibeGGMAylBwcHKT9/f39HDV7e3u5CCzDQNbDOU2SGmWhNmsmi7N8m7l0N7wKMAayydrl9JLi+QnICML+kK5Sx4DOGc5JXCSvAUAuKY8GOI1ydF1G1To3P3WYOfwBMSOq1CmGeqYh1FJIMgWcGZLd/1Mw5cZowIPjHyn7M4a3V7j15ePI2et6FXh6Pv3NbnXYw5fvxhtOotPkqSKcPwyYHHcaUfZnnN9a5u7wYAd4m5xWqsCz4cz2T+XRIBVpEiD/9toFOMeoPMP02f6LcFq5cJlzV/V/OHddAPwL37CyC3NhW/kAAAAASUVORK5CYII=" alt="Исходный текст" style="vertical-align: middle !important; border: none !important" />',
      sage: '<img src="data:image/png;base64,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" alt="Сажа" style="vertical-align: middle !important; border: none !important" />'
   },
   neutron: {
      begin: ' ',
      end: '',
      sep: '',
      bold: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4ZNSwbr4EAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEl0lEQVRIx7WWa4hVVRTHf2vtvc+dcZxJHc0ZnWHsJflIS01GpJwxH9kQWEHggwxCIrAowU8a+MXUjCIIom8RFIiBaQXqB2eGxAcpvsmcHOfl6851HGfGca73cfpwzn0546dow+Kcfc49+7fXWv+17hbCsWiTHwGqgAj/fcSBruZdEgeQPEBtT+uBpkhZ9bAvROQRFryD3BwESXTDY/PrgWPNuyQuIWBBb0dT4+iJL5AY7CadepAHGA5BBGEkEIg6cGOQwSv4pbPrgWMWqO65erCxbFItA9EzdJzYQby/C3wfEXDOBeY5nHU4ZzHGYa0N7y3GGKw1GGPR4olQuQZ/1NNo/6nGdOncZywQiZRWkRjspuPEDu52NpNODgHgeRZxHuJ5qOehzmE8D7UWnMNPWMQ51FokZVBjkFQUje4mVbUB340HiCjgA6RTceJ9nSHAxzmDtQ5jg11bY7DGYDQwVcWY4CoiqCgqiiGBJmPgJ4KEA3YkaThncc4LQ2Wx1mKyZgILAQWwEB4qgAzFPqyidavqeO+dV+i63sPnX//KzWg/v/z48SO1+smWfVRWlLH2rTmUjxvF4SNXOXohpzQALfDAc7y7ph7nLD/tOcrGDQ0451i9/ju2ffl7weJffdvIxk/3ocaw6o3nOdT8D9YqdQunZNWWGZrxQEVwznGp5TrnLnZw6mw7fX33eXHOk6gxtLTGCiBtnb2IKLOmVdLbN0TLldu0dfRy7UY/IpofrSBcIoIAzlq2bt+LsQbnHLv3/slH7y/l752/YYwpgGRku3zxVHbvPY+o8sOec0GeimvIi1bOEwk9cZ7DC5N+KzbAjZt3eXvlPEYVewWQSMSxrG4q0e573O4dyoogUJuSTxnmiXEexirGBKrq6R1kxZIZvPrK9ALI9i0rAPjjeBvWGFDJQtKPygkiQSVnJGssDcueY8WSGQD8vP9sAWT/wb8AeKl2Ci8vqMluNNt68obm96cMwFrH+PJSGpbOBKCvf4iTZ7oKPjx74Sb3BoMet3B+NWWji5CwMDMQGTknNturVr42m0gkKKNDTZdJpwvrI5H0aTraFhavoW5hTV5eBHnYk0wHDRRjqakup3beFACisQFOnr6GMXaYuk6fv0WsZxCAWdMmUDGhBNGgQ5OXl1xOEIyxjB1Twqo356Ia/ODA4cuoUaonjymATKooRURpPNKe7RbL6p+gpNhDtKDGc+oCsNawbXND9mV75x0utcT4bPPyYe1k/do5AOz85gTtXX3UVJVR+XgJH6ybxRffxwqKURZt8qf7g60XAfyWrWi8A9Gwq+rIBpKNfbYLZ3IhStJV0TP2QxBI2KqZNtsu1WGKKpBUFCNJRDUHEg3A2YUku3BuQwEAdaTtOHxxCMlsuB5IIgYl02DSajRqkGRP+FcqIIovEt4LadGgHlQhTLIfFqCKkLLl9I1+nZSWUpRsJcHkuCza5BcBtTJwrtEvfgpJ3gU/CZJfszJ8nntMwYEAS0pLiSQ7GPKerQeOZ04rRcAC7T912HfjH6pYITcVHuKOuAmbvsN9b+bi8LQyJHnnrqL/4dw1BPAv0adEn8nxnpkAAAAASUVORK5CYII=" alt="Жырный" style="vertical-align: middle !important; border: none !important" />',
      italic: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4cE4Nh3jkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEVUlEQVRIx7WW229UVRTGf2utvc8M0GmBFgqlxAtMgkK5SUgbErEKiQ/6xJP4L+gj/g0kPPlsfDI+GJ9MSAQSLY2SFhBvXK220BYQplBogaHDXI4P+8zMmbY+GXeyMrPPnHO+tdb3fWu2kKyDx+IM0Atk+O+rBNwePiElAEkB9M9OnDqbad+85AkR+ZcIv0FzD4KUZ6Bj/yAwMnxCSpIADDyeOjvU1r2HcnGGWvVFCmApCCIIywGBqAe/GimOE+d2DQIjDtg8e/P0UHtPP08LvzJ1/jilJ7chjhEB732IyOOdx3uHmcc5l3x3mBnOGWYOXdENGz8kXrkVfXJpqJZ7I++ATCbXS7k4w9T548xND1OrLAAQRQ7xERJFaBSh3mNRhDoH3hOXHeI96hxSNdQMqRbQwldUez8i9l0AGQVigFq1RGl+OgGI8d5wzmMuZO3McGaYhlBVzMKniKCiqChGGa08gLgcCAfcctLw3uF9lLTK4ZzDGmEhEoAWsAQ8UQB1FLdYRZF3uDoP3tHV2c67h3bxwZF+qtUaJ09f5sZf97k1/RhzxtEje9nT18vE5EO++Po3RBXRptIAtKWCyOOjqEG2c55nxTKnvrsCwMjFCU6eucKtyVmcKYMH8lwbK3Bt7D5r16xsVFZXG+l2iQhCUJJEUeAgFX2vB+9c+GUytE6NbDZiU89qRn66zNj4LM4C8apKLJru1iIQ51AfYc5aQPb0vcRCqcz4zYeYBT4Ov7WNH0dvhb0qkqpCNLyvhZN0JRp5nDUJdubo276JG2P3EQkkD+x7mUqlRuHBs0B6SgSNSlIoSyoxH2FOGybb0N3B+q4cxWKZTz5+h/b2LCfPXGd45GZDyqqKWhOktogTrYMgEpxcl2wCsnN7LwCffznKN99epSOXZV3nquCLhpKkkWhj9KSWpudTHcAl48M7z45tPdy9N8+zYoWpO3NcHytwYP8rZCKfZJ5UI4GXNEgdS9NTNpiwLl9HNhOR37KOsfGZ4HYzzl2cpm1VxO6+jagpluKiGYIsrqQ+QcOga6oqv3U9mcjx58TDRvumbs9zr/CUgX2bWznRVPuQpAxZxAmCWZ0Pw5xj5/YeAO78PR+yNsNMOf/zHbrXtZF/tbMVQJptW4aT0C6X+GNDdweH3syzf28w4aGDedasbjr66h8zFJ+Xee/wVvbt3oiZoiKhTaJNTlrNGDZmhjrHo7kFfhid5NyF6ZZM64MwjoVPP7uEqqQMmHAhQk2WMSMIqMeyG5BqAZNKeCiRaWiBNElNKq9zEO4LVaCemltLLB6h0gB5IeUHsOo16DmKFgypzCZ/pQKixMmoQISaaPCDKiQkx4kBVYSq62S+7X2qmiNbmaDMppIcPBZngX55+vtQvGILUpmDuAKS9qws3Tcv03IgwFHVHJnKFAvRtkFgtH5ayQID+uTS97HvWuRYobkVFuEum4SrPeJ5tOPt5LSyIKlzV/Z/OHctAPwDvUIgonMgRrIAAAAASUVORK5CYII=" alt="Курсив" style="vertical-align: middle !important; border: none !important" />',
      striked: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4mAVVxcQgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEQ0lEQVRIx7WWXYhVVRTHf2uvtc8dHe+Yo5NmI1Q6aCB9aTX20GhJUBGoDxVFhQ8JgU+m0IsvviTZUyC+9FD45IOgqVmhM4qUX4gSiEI21iiFM6bOR3fmzv04Pexz7j33zgRFtGGzzz4f+7/X+q///2whaT3b4hzQCeT4760I3Dy5S4oAkgHovtP/zYlc26IpX4jI3/TwDOpzEKQ0BLOfWQOcPrlLipIArLo3cKJv1vwnKRWGqFYmMwBTQRBBmA4IxHnw9yGFn4nzj68BThuw6M71b/vaFnYzNniJgbM7KY7ehDhGBLz3oUcebx7vDVWPmSXXhqpipqgabsZ8eOBt4plLcKMX+qr5FV0G5HL5TkqFIQbO7mT4xkmq5QkAosgQHyFRhIsinPdoFOHMwHvikiHe48yQiuJUkcogbnAflc7NxH4eQM4BMUC1UqQ4ciMBiPFeMfOohV2bKqaKutCdc6iGUURw4nDiUEq48m2IS4FwwKYrDe8N76MkVcbhfVvZ/flxFi6Yw7MrHqFjXp7C+CTnLw7w9bGriLgAloAnFUCK4pqrKGoCMAv72PTeaob+GGXHriN8tOMAV366xdqepbyx7gmcc0kXJB2ljtIA4iOPj6Ia2WZhBDh49BKnz/9CpQqFQon9X10C4KnHOjMgrpa+WhhpukQEIVSSRFHgINMBfjjXjyZzdcr9HW0A3BsZD/xkQGJx2Ww1gZjhfISaNoBs3PxlKFlTZrfNYGnXAta9vJzRsSL7D11GnUvSFKIQF9ZLUaZE4iKPqaGmAUytVl17Pn2zloLfb42wd+95hkcna1XWEEkzJ6mSvRmRj/CRBV7S8jVDzdiy/SA7P+ul99Q15nfk+WBjN3PbW8Pi+g84AVD1OG+ohpweunx5evs7UL/8uOnRh+vX19ZLm8v6k/mUB8+RK1f/tfVu3bCh7m/U5ZKJRPDeiL1HVXl95cqgbA3KVudwGqzDiZDLGdu3rKZUqvDJ7jMhVRDEmBJPgxiDeILRWQMP77+7iueefqhmhMFSlKVLOgC48dtIo0ZccGgyvLhsJJpUkqommlAOf3eVtT1dvPrSMtrntOK9suThdl55sYvxiRLHT/2aITz4l7gGjTcSb6aIWcPOhkeK7PniHGufX8ymd1bQOjNi7M9Jrl2/y/fnbjJWKId3U32Iq3PSCEJSXRps2yWumgCNT1Q4cuwaR3v7Q86RmlfVBZh6llCVacQIAs6jLQuQyiAq5fBRCiQh1y6zkIjUOAjvhShwnqq1E4tHKNdAJqV0G1ofhYVv4QYVKd9JfqUC4oiTVCBCVRwCIe8JybFzVEVwIlRsLiOzXqPi8rSU+ynxYFF6tsUtQLeM/dgXz1iMlIchLoNkNStT5/XbNBwIMCouT648wES0bA1wJj2ttACr3OiF3tjPa1KsUJ8KTbjTbsKqdxmPlr+QnFYmJHPuavkfzl0TAH8BxxkUVA70HfMAAAAASUVORK5CYII=" alt="Зачеркнутый" style="vertical-align: middle !important; border: none !important" />',
      underline: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4oEk9MHVgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAD2ElEQVRIx7WWT2xUVRTGf+fPfVOkBbFtQCwaK/VPYkIshhRjQjAajAQXLtGdW7esXJi4MEQSjRsXxrh3qRvFhYWNiBED/iMkitCC4kBKaRvsdOa95+LemXkzUzYYb3Lz3rvz5n7nfN93zrtCGvuOlDVgAqjx30cDuHLymDQApAIws3DxyxO1TTsG/iEid5jxN+g+gyDN67B5z37g1Mlj0pAEsHdx7sTs8NanaN6+TpGvVQAGQRBBWA8IRAOEe5Hbv1OO7NoPnHJgx8Ifx2c3bZ9hpX6WudNHaSxfgbJEBEIIcWaB4IEQHLOAu6d7x8xwN8wc3bAV7n+V8p6d6PKZ2WJk95QDtdrIBM3b15k7fZRb8ycpWqsAZJkjIUOyDM0yNAQsy1B3CIGy6UgIqDuSG2qG5HW0/in5xBuUYQyg5kAJUOQNGkvzCaBkz+4pXnx+moMHprn29yLnL/yJqiKq8SrCozu3Mj46zDffXeLcL39xeX4Ro4m0bpCXTSRt7utZIwTn5/NXuXzlJgcPTHPht2t8+Mlshzp3x915/bVnGB8d5vPjv1IURLpUSQ5ItgLtd1EWnBAyQgjkedlZjxsbZoaZRmrSZnleoqqoSsq06zT6MwlZgCxLosaIAVQE867IpoabdkA0UdieJLe1h3fqgOgkSSDtCSCquDuW1kwNVesBsQpIKVplqw/EHQ0Z5tYDoqoET1lUZhvE+gwhGvdrowxkolnAzTE3zK2riVmibBBEzXroKkWhX5NqJhYyzLXDf8xEugCeNuzXxLogxZ00ATALaPDoHo3XJEon+k7EooO9rXJfHd7uTyB4cMpmhRK1rrvaIBYBeuhKoNLWJK2LDGQihOCUIXQi3lDLAKjVHLfYNtQMFUFVyTLrtJ+i6FqZtvD0FGMsntjooqsem9rGKy/vAmBqcoxnZyYZHxvG1BjdspG9T+9g8sEtALyw72Eemtic2k7s0NVa6dPEEY+t4dL8IvNXl/jsi/OdCNvVvrSyxvfnrvHDT/UeV4koKkKpup4mCdENSbXx3tuH7uqT+P5HZ7uaDAof6VJ33n3rpbsC+ODjc6gKhaxTjCCgARvahuR13nznq1jBohXnSLcJikRqkgbxvbiGBgq/j1ICQqsDsibNG7DxCdh+GK0b0lpIn1IBUcrUKhChEI310HFR1KAQQUXIfZSl4UPkOsJQ6yJNHmjIviPlEDAjKz/OlhseQVq3oGyBVGtWBp+7y/QcCHByHaHWmmM1e3w/8G37tDIE7NXlM1+XYayvYoXuo9CHu24QXtzkn+zJ59JpZVUq566h/+HctQrwL+qE5L+7hUevAAAAAElFTkSuQmCC" alt="Подчеркнутый" style="vertical-align: middle !important; border: none !important" />',
      capsBold: '<img src="data:image/png;base64,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" alt="КАПСБОЛД" style="vertical-align: middle !important; border: none !important" />',
      spoiler: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAAXNSR0IArs4c6QAAAAZiS0dEAHkAeQB5f3ijhgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw8lGBv14DwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC80lEQVRIx8WXwY4bRRCGv7+6auxAHBBECoTNKUECCQkhJLQ5RcudF4A3CFzzDpHyJLwBXNjsKeQQCcUcSZA2OXmjhWSjZZ3xuDnM2B7bycWO7JJaoz50z9dVf1V1i8Zu3ModYAfosJpdBR6xng2Bpwd3NARQC2z3+PEvdzsXriytkLQ0VrV6Pc0ems5BqDyC977ZA+4d3NFQDdj1fw/v7p+/9BXl6RHj6lVrs2U41oFrAc0AQRYQ76PTR+Tel3vAPQeuHP/96/6Fy7u8HPzB4f3bDE+eQs5IEBH1KILwIMJJKVaGc/dmDyelhHsiJcfOXYKPfyC/cw07ebA/7n39qQOdTm+H8vSIw/u3ef7kgPHoDICicBQFKgqsKLAIUlFg7qurKoJcOorA3FGVsJRQNcAGP1Pt/ESOiwAdBzLAuBoyfPGkActEOO5B8sDd8ZTwlEhWj1XNzEgpYWZIwmSYjESJRs+ocokaKH/94ZybN39kU9bv/4mZzbTcfHwxk4pwPIJNmpmQGbJZ5i7BRRFQFPg6mlox1DPPzSqBT2sPdWZqi3BZ1o7qApw7FgXJ08bhJNVhXdRc23NWBJ626LlFzbU9l6IguW0FbvwmzQGkFFg4KW0WTq3+PddNJv0ThIeTy7qtbBRuorkGTlrynIhwcsTG4aalZJIQzBXhuvillMB9K3B1ps7feBY058i9PsUmwyrDJPLCf+fg3NNW4MyEZDPNLSdEHVZzRyb6/f5UC4sDtKa+NLuVNHNJjPWaIgwCC1L3I1QNSBohq68y1nxl8xutc02faKzev/YaFoz9A7ICMZrCvVL5DN79HC5/jw0SGh03V2eBjNy0FiTGsjX8VpcNGvHnpvCaROUf8uL8d1TWozt6TMknQ924lbvArl4+3M/nrqLRc8gjUDt4Wp6vWXU1707AqaxHZ3TIWfHZHvD75PXVBa7byYPfclxcCJta2a230g7edGgf/8N/xRffNq+vM7Xerd01363XgL/e0rv1DOB/3GanONToAzwAAAAASUVORK5CYII=" alt="neutron_spoiler.png" style="vertical-align: middle !important; border: none !important" />',
      source: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4rBeeyy1wAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEBUlEQVRIx7WWTYhVZRjHf8/He+5YjoUJmo1tKigRIoKYWcQwRbXoAwwXkURIFESDRHVTK23SGh2sUPpAGFoMUZC4bEA3jq4mF0IELlykNLqakcnPaa7347R4zzn33Du6ig48vOecy3l/7/s8//9zXyG7BqtpBegDKvz3qwZcPLlfagBSAvTPnzt6orJi3ZIvROQ2EX+D9jMIUp+Du54YAqZP7peaZICByzMnppavfoz6whyt5s0SYCkEEYRbgUA0QLgbWfiTtPfRIWDagXXz549NrVjbz/XZ35k5tY/atYuQpohACCFGEggeCMExC7h7du+YGe6GmaPLVsO9m0nveBC9dnqq1fv4Qw5UKr191BfmmDm1jysXTtJqLAKQJI6EBEkSNEnQELAkQd0hBNK6IyGg7kjTUDOkOYvO/kKzb5g0rAKoKJACtJo1alcvZICUEAz3gHlctZvhZpjGUFXM4igiqCgqilFHG5cgrceCA34raYTghJBkqXLcHSvCYmSADlgGzxRATtFuFSVdgMnD1bgTd34ef4uJ77dgpqjF9Bwc3VjAVAXJR2lTOiAhCYQkKYo9efhDNr3+LUcmhjF3tgxPAGBquCnf7H2Z9z/9lf0jz5dAWqiNcrpEBCEqSZKkWDnQMVp2b+aoWgbUYswhqWg5W10QdzQkmFsxeQghjh6lChQ1icA4SmkXonG+jprkJsv9kGQ1ee3tH/jx0Bu8+e5PuBmHvnoFgIOjGzEztu85yt5PnmPX2PGudClligxW0/W1y2fPCDA3/Q6tG+cx18Jk0Wjte/O2fE2teK+mhbRblfu5vuYDAJrJug3FThCJTs4lm0HGD2xGs4kOjm7k690vxRWLMvrxs+zZ/nS75ZSyUr603J9ygGftY/zAZoa3HeG7sU2YGdWRyUJdZsauseNxkgwqeU0ySM4qCg9CCE4aQmGuDnVlvsiLraqoaRtSCvLCdzo+msfMIMt/N8TMS5NaNKQuhURlSXsbZXWBYObtIrtTHZnky89eYMfnx1BTvvjoGQB2bxtCVdn53pMA7Ng6UKgqT1tHJxmsputbN86dAWie3Yks/rVk+90hIkvfi2Q1UZpJH/MrtyJAPfRt8HKBzCy2bc266m0gIEWvahsw71lCSzrNWNQEDVjPGqQ5i0kjfpSDJOZaSxPlu2kvSKIJNdDylaQSEBoF5KbUL8Gdj8DaV9FZQxrz2V+pgChp1ioQoSUa/VCoSEhVaYmgIjT9Hq4uf5Gm9tLTOEed+2oyWE17gH65/sdUuuwBpHEF0gZIuY/K0uf2azoOBDhN7aXSmGExeXgI+C0/rfQAA3rt9PE0rOpyrJTUKHRxb7kIb/3NP8mGp7LTyqKUzl09/8O5axHgX8qI7RdwIWtaAAAAAElFTkSuQmCC" alt="neutron_code.png" style="vertical-align: middle !important; border: none !important" />',
      sage: '<img src="data:image/png;base64,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" alt="neutron_sage.png" style="vertical-align: middle !important; border: none !important" />'
   }
}

var i18nRus = {
   mLinkBegin: '[',
   mLinkEnd: ']',
   mLinkSep: ' / ',
   thrdLoading: 'Загрузка треда...',
   sending: 'Отправка...',
   okReloadingNow: 'Ok. Обновляем страницу...',
   no: '№',
   thrd: 'Тред', hidden: 'скрыт', filtered: 'отфильтрован',
   post: 'Пост',
   reply: 'Ответ',
   replyThat: 'Ответить',
   fold: 'Свернуть',
   unfold: 'Развернуть',
   show: 'Показать',
   hide: 'Скрыть',
   hidePost: '&#215;',
   close: 'Закрыть',
   sage: 'Сажа',
   dflt: 'По умолчанию',
   allDefault: 'Восстановить умолчания',
   apply: 'Применить',
   settings: 'Настройки',
   bookmarks: 'Закладки',
   fromBms: 'Из закладок',
   toBms: 'В закладки',
   imgs: {
      fold: 'Свернуть изображения',
      unfold: 'Развернуть изображения'
   },
   imgLess: {
      hide: 'Убрать сообщения без изображений', 
      show: 'Показать сообщения без изображений'
   },
   citeLess : {
      hide: 'Убрать сообщения без ответов', 
      show: 'Показать сообщения без ответов'
   },
   btns: {}
}

i18n = i18nRus