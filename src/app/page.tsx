'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Trophy, TrendingUp, ChevronDown } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Win Big",
      description: "Successful bets earn you 80% of the losing stakes plus your original bet",
      number: "01"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fuel the Network",
      description: "Lost bets contribute to the ecosystem, with 20% returned after 14 days",
      number: "02"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Earn Freebets",
      description: "Receive NFT freebets from sponsors when you participate in the ecosystem",
      number: "03"
    }
  ]

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-hero font-heading mb-8"
            >
              THE SPORTS
              <br />
              <span className="text-primary">BLOCKCHAIN</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-heading-xl font-heading text-white font-light mb-4">
                Bet on <span className="text-primary font-medium">Passion</span>
              </h2>
              <p className="text-body-lg text-gray-400 max-w-2xl mx-auto">
                Experience the future of decentralized betting on Chiliz Chain. 
                Win rewards or fuel the ecosystem.
              </p>
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="/betting"
              className="btn-primary text-lg px-12 py-6"
              style={{
                borderRadius: '30px 15px 30px 15px'
              }}
            >
              Start Betting
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              href="/wallet"
              className="btn-secondary text-lg px-12 py-6"
              style={{
                borderRadius: '15px 30px 15px 30px'
              }}
            >
              My Wallet
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-heading-xl font-heading text-white mb-6">
              How <span className="text-primary">GOGO</span> Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Features Grid - More organic layout */}
          <div className="grid lg:grid-cols-3 gap-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative group"
              >
                <div className="relative backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border-l-4 border-primary/50 group-hover:border-primary transition-all duration-500 h-full overflow-hidden"
                  style={{
                    borderRadius: index % 2 === 0 ? '40px 20px 40px 20px' : '20px 40px 20px 40px'
                  }}
                >
                  {/* Section Number - More subtle */}
                  <div className="absolute top-4 right-4 text-6xl font-heading text-primary/10 select-none">
                    {feature.number}
                  </div>
                  
                  <div className="p-8 relative z-10 h-full">
                    <div className="flex items-center mb-6">
                      <div className="p-4 bg-gradient-to-r from-primary to-purple-500 text-white mr-4"
                        style={{
                          borderRadius: '20px 10px 20px 10px'
                        }}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-heading-md font-heading text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-body text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mechanism Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Win Scenario */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-32"
          >
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-green-500/10 to-blue-500/10 border-l-4 border-green-500/50 hover:border-green-500 transition-all duration-500 text-center overflow-hidden"
              style={{
                borderRadius: '50px 30px 50px 30px'
              }}
            >
              <div className="p-12">
                <div className="absolute top-8 left-8 text-8xl font-heading text-green-500/10 select-none">04</div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-8">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-heading-lg font-heading text-white mb-6">You Win!</h3>
                  <p className="text-body-lg text-gray-400 mb-12">
                    Bet 100 CHZ and your team wins
                  </p>
                  
                  <div className="flex items-center justify-center space-x-8 max-w-4xl mx-auto">
                    <div className="text-center">
                      <div className="text-caption text-gray-500 mb-3 tracking-wider uppercase">Your bet</div>
                      <div className="text-heading-lg font-heading text-white">100 CHZ</div>
                    </div>
                    <div className="text-heading-xl font-heading text-green-400">+</div>
                    <div className="text-center">
                      <div className="text-caption text-gray-500 mb-3 tracking-wider uppercase">Winner's share</div>
                      <div className="text-heading-lg font-heading text-white">80 CHZ</div>
                    </div>
                    <div className="text-heading-xl font-heading text-green-400">=</div>
                    <div className="text-center">
                      <div className="text-caption text-gray-500 mb-3 tracking-wider uppercase">Total payout</div>
                      <div className="text-display font-heading text-green-400">180 CHZ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lose Scenario */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative backdrop-blur-sm bg-gradient-to-br from-orange-500/10 to-red-500/10 border-l-4 border-orange-500/50 hover:border-orange-500 transition-all duration-500 text-center overflow-hidden"
              style={{
                borderRadius: '30px 50px 30px 50px'
              }}
            >
              <div className="p-12">
                <div className="absolute top-8 left-8 text-8xl font-heading text-orange-500/10 select-none">05</div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mb-8">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-heading-lg font-heading text-white mb-6">You Lose</h3>
                  <p className="text-body-lg text-gray-400 mb-12">
                    Your bet fuels the network and you get 20% back after 14 days
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                    <div className="text-center p-6 bg-white/5 border border-white/10 backdrop-blur-sm"
                      style={{
                        borderRadius: '25px 15px 25px 15px'
                      }}
                    >
                      <div className="text-caption text-gray-500 mb-3 tracking-wider uppercase">Your bet</div>
                      <div className="text-heading-lg font-heading text-white mb-4">100 CHZ</div>
                      <div className="text-body text-gray-400">Goes to winners & ecosystem</div>
                    </div>
                    <div className="text-center p-6 bg-white/5 border border-white/10 backdrop-blur-sm"
                      style={{
                        borderRadius: '15px 25px 15px 25px'
                      }}
                    >
                      <div className="text-caption text-gray-500 mb-3 tracking-wider uppercase">After 14 days</div>
                      <div className="text-heading-lg font-heading text-primary mb-4">20 CHZ</div>
                      <div className="text-body text-gray-400">Returned to you</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-body-lg font-heading text-white mb-4">
            GOGO
          </div>
          <p className="text-body text-gray-400">
            Powered by Chiliz Chain • Built for Sports Fans
          </p>
        </div>
      </footer>
    </div>
  )
} 